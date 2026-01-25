
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

      try {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        // Ensure date is serializable (gray-matter returns Date object for YYYY-MM-DD)
        let frontmatter = data as unknown as BlogFrontmatter;
        // Check if date is Date object
        if (data.date && data.date instanceof Date) {
          frontmatter = { ...data, date: data.date.toISOString() } as BlogFrontmatter;
        }

        return {
          slug,
          frontmatter,
          content,
        };
      } catch (err) {
        console.error(`Error parsing blog post ${fileName}:`, err);
        return null;
      }
    })
    .filter((post): post is BlogPost => post !== null);

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

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Ensure date is serializable
    let frontmatter = data as unknown as BlogFrontmatter;
    if (data.date && data.date instanceof Date) {
      frontmatter = { ...data, date: data.date.toISOString() } as BlogFrontmatter;
    }

    return {
      slug,
      frontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
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
