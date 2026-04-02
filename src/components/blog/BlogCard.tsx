'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta, formatDate, categoryColors, categoryLabels } from '@/lib/blog-types';

interface BlogCardProps {
    post: BlogPostMeta;
    index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
    const colors = categoryColors[post.category] || categoryColors['ai-news'];
    const categoryLabel = categoryLabels[post.category] || post.category;

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl overflow-hidden bg-white/[0.03] border border-white/5 hover:border-brand-orange/30 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(255,87,34,0.1)] animate-slide-up opacity-0"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Cover Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] ${colors.bg} ${colors.text} backdrop-blur-sm border border-white/5`}>
                        {categoryLabel}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-brand-orange transition-colors duration-300 line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
                    {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 pt-2 text-[11px] font-semibold text-white/30">
                    <span>{formatDate(post.date)}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{post.readingTime}</span>
                </div>
            </div>
        </Link>
    );
}
