'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MDXContent from '@/components/blog/MDXContent';
import BlogCard from '@/components/blog/BlogCard';
import { BlogPost, BlogPostMeta } from '@/lib/blog-types';

interface BlogPostClientProps {
    post: BlogPost;
    relatedPosts: BlogPostMeta[];
    formattedDate: string;
    categoryColors: Record<string, { bg: string; text: string }>;
    categoryLabels: Record<string, string>;
}

export default function BlogPostClient({
    post,
    relatedPosts,
    formattedDate,
    categoryColors,
    categoryLabels,
}: BlogPostClientProps) {
    const [copied, setCopied] = useState(false);
    const colors = categoryColors[post.category] || categoryColors['ai-news'];
    const categoryLabel = categoryLabels[post.category] || post.category;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
        }
    };

    const handleShareTwitter = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(post.title);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };

    return (
        <main className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange/30 relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] right-[-5%] w-[70%] h-[70%] rounded-full bg-brand-orange/5 blur-[220px] animate-pulse-slow mix-blend-screen opacity-30" />
            </div>

            <Header />

            {/* Hero Cover Image */}
            <div className="relative w-full h-[350px] sm:h-[450px] mt-24">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/40 to-transparent" />
            </div>

            <div className="relative z-10 flex-grow max-w-3xl mx-auto px-6 w-full -mt-32">
                <article className="animate-fade-in">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm font-semibold mb-8 transition-colors group"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>

                    {/* Category Badge */}
                    <div className="mb-5">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] ${colors.bg} ${colors.text} border border-white/5`}>
                            {categoryLabel}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15] mb-8">
                        {post.title}
                    </h1>

                    {/* Meta Bar */}
                    <div className="flex flex-wrap items-center gap-4 pb-10 mb-10 border-b border-white/10 text-sm text-white/40 font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange text-xs font-black">
                                {post.author.charAt(0)}
                            </div>
                            <span className="text-white/60 font-semibold">{post.author}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>{formattedDate}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>{post.readingTime}</span>
                    </div>

                    {/* Article Content */}
                    <MDXContent content={post.content} />

                    {/* Tags */}
                    <div className="mt-14 pt-10 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-[11px] font-bold text-white/40 uppercase tracking-[0.1em]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Share */}
                    <div className="mt-8 flex items-center gap-3">
                        <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em]">Share</span>
                        <button
                            onClick={handleCopyLink}
                            className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-[11px] font-bold text-white/50 hover:text-white/70 hover:border-white/20 transition-all"
                        >
                            {copied ? '✓ Copied!' : '🔗 Copy Link'}
                        </button>
                        <button
                            onClick={handleShareTwitter}
                            className="px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-[11px] font-bold text-white/50 hover:text-white/70 hover:border-white/20 transition-all"
                        >
                            𝕏 Post
                        </button>
                    </div>

                    {/* CTA */}
                    <div className="mt-16 p-10 rounded-3xl bg-brand-orange/5 border border-brand-orange/20 text-center space-y-5">
                        <h3 className="text-2xl font-bold text-white">Check Your Career Safety Score</h3>
                        <p className="text-white/50 max-w-lg mx-auto">
                            Use the Career Index Calculator to see exactly how AI impacts your specific role — task by task.
                        </p>
                        <Link
                            href="/"
                            className="inline-block bg-brand-orange text-white px-8 py-4 rounded-full font-black uppercase tracking-tight text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_8px_30px_rgba(255,87,34,0.4)]"
                        >
                            Try Calculator — Free
                        </Link>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-20 mb-10">
                            <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost, index) => (
                                    <BlogCard key={relatedPost.slug} post={relatedPost} index={index} />
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </div>

            <Footer />
        </main>
    );
}
