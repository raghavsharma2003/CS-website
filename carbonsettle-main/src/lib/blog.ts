
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "src/content/blog");

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  category: string;
  author?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

export function getBlogPosts(): BlogPost[] {
  // Create directory if it doesn't exist (safety check)
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as BlogFrontmatter,
        content,
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getBlogPost(slug: string): BlogPost | null {
  const fullPathMdx = path.join(blogDirectory, `${slug}.mdx`);
  const fullPathMd = path.join(blogDirectory, `${slug}.md`);
  
  let fullPath = "";
  if (fs.existsSync(fullPathMdx)) {
    fullPath = fullPathMdx;
  } else if (fs.existsSync(fullPathMd)) {
    fullPath = fullPathMd;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getBlogPosts();
  const tags = new Set<string>();
  posts.forEach(post => {
      if (post.frontmatter.category) {
          tags.add(post.frontmatter.category);
      }
  });
  return Array.from(tags).sort();
}
