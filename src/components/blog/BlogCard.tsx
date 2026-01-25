
import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { BlogPost } from "@/src/lib/blog"; // You might need to adjust import based on your strict alias config
import { format, parseISO } from "date-fns";

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col h-full bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-900 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 uppercase tracking-wider border border-blue-100">
                    <Tag size={10} className="mr-1" />
                    {post.frontmatter.category || "CBAM"}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Calendar size={12} />
                    {post.frontmatter.date ? format(parseISO(post.frontmatter.date), 'MMM d, yyyy') : 'No Date'}
                </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 leading-tight">
                {post.frontmatter.title}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                {post.frontmatter.description}
            </p>

            <div className="mt-auto flex items-center text-sm font-bold text-slate-900 group-hover:translate-x-1 transition-transform">
                Read Analysis <ArrowRight size={16} className="ml-2" />
            </div>
        </Link>
    );
}
