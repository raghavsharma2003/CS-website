
import React from 'react';
import { getBlogPosts } from '@/src/lib/blog';
import BlogCard from '@/src/components/blog/BlogCard';

export const metadata = {
    title: 'CarbonSettle Knowledge Hub | Practical CBAM Guides',
    description: 'Clear, practical guidance on EU CBAM compliance and updates for Indian exporters. No jargon, just improved export processes.',
};

export default function BlogIndexPage() {
    const posts = getBlogPosts();

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                    The Exporter’s Guide to CBAM
                </h1>
                <p className="text-lg text-slate-600">
                    Clear explanations, regulatory updates, and practical steps to help your factory stay compliant.
                </p>
            </div>

            {posts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border border-dashed border-slate-300 rounded-2xl bg-slate-50">
                    <p className="text-slate-500 font-medium">Knowledge base is initializing...</p>
                </div>
            )}
        </div>
    );
}
