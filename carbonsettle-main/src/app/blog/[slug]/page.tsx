
import React from 'react';
import { getBlogPost, getBlogPosts } from '@/src/lib/blog';
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, ShieldCheck } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import BlogCTA from '@/src/components/blog/BlogCTA';

// Force static generation for these pages
export async function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        return {
            title: 'Article Not Found',
        };
    }

    return {
        title: `${post.frontmatter.title} | CarbonSettle`,
        description: post.frontmatter.description,
        alternates: {
            canonical: `https://carbonsettle.com/blog/${slug}`,
        },
        openGraph: {
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            type: 'article',
            url: `https://carbonsettle.com/blog/${slug}`,
            publishedTime: post.frontmatter.date,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    // Extract FAQ for Schema (Simple Regex parser)
    const faqs = [];
    if (post.content.includes("FAQ") || post.content.includes("Frequently Asked Questions")) {
        const splitContent = post.content.split(/FAQ|Frequently Asked Questions/i);
        if (splitContent[1]) {
            const faqSection = splitContent[1];
            const lines = faqSection.split('\n');
            let currentQ = "";
            let currentA = "";

            for (const line of lines) {
                if (line.trim().startsWith('###') || line.trim().startsWith('**')) {
                    if (currentQ && currentA) {
                        faqs.push({ question: currentQ.replace(/#|\*/g, '').trim(), answer: currentA.trim() });
                    }
                    currentQ = line;
                    currentA = "";
                } else {
                    currentA += line + " ";
                }
            }
            // Push last one
            if (currentQ && currentA) {
                faqs.push({ question: currentQ.replace(/#|\*/g, '').trim(), answer: currentA.trim() });
            }
        }
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.frontmatter.title,
        datePublished: post.frontmatter.date,
        author: {
            '@type': 'Organization',
            name: 'CarbonSettle Compliance Team'
        },
        dataset: faqs.length > 0 ? {
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: f.answer
                }
            }))
        } : undefined
    };


    return (
        <article className="min-h-screen pb-20">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200 pt-12 pb-16">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 mb-8 transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Back to Knowledge Hub
                    </Link>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
                            <Tag size={12} className="mr-2" />
                            {post.frontmatter.category}
                        </span>
                        <span className="flex items-center text-sm text-slate-500 font-mono">
                            <Calendar size={14} className="mr-2" />
                            {format(parseISO(post.frontmatter.date), 'MMMM d, yyyy')}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                        {post.frontmatter.title}
                    </h1>

                    <p className="text-xl text-slate-600 leading-relaxed font-medium">
                        {post.frontmatter.description}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 md:px-6 max-w-3xl py-12">
                <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-2xl prose-img:shadow-lg">
                    <MDXRemote
                        source={post.content}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                            }
                        }}
                        components={{
                            h2: (props) => <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-slate-900" {...props} />,
                            h3: (props) => <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-slate-800" {...props} />,
                            blockquote: (props) => <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-6 py-4 my-8 rounded-r-lg italic" {...props} />,
                            ul: (props) => <ul className="list-disc list-outside ml-6 space-y-2 mb-6" {...props} />,
                            li: (props) => <li className="pl-2" {...props} />,
                            table: (props) => <div className="overflow-x-auto my-8 border border-slate-200 rounded-lg"><table className="w-full text-sm text-left" {...props} /></div>,
                            th: (props) => <th className="bg-slate-100 px-6 py-3 font-bold uppercase text-xs tracking-wider border-b border-slate-200" {...props} />,
                            td: (props) => <td className="px-6 py-4 border-b border-slate-100" {...props} />,
                        }}
                    />
                </div>

                {/* Disclaimer Footer */}
                <div className="mt-16 pt-8 border-t border-slate-200">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex flex-col sm:flex-row gap-4">
                        <ShieldCheck className="text-yellow-600 flex-shrink-0" size={24} />
                        <div>
                            <h4 className="font-bold text-yellow-800 mb-1">Compliance Disclaimer</h4>
                            <p className="text-sm text-yellow-700 leading-relaxed">
                                Strategies described in this article are for educational purposes. CBAM regulations (EU 2023/956) evolve quarterly. Always verify strictly with your accredited verifier before filing definitive reports.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Hardened CTA Block */}
                <BlogCTA />

            </div>
        </article>
    );
}
