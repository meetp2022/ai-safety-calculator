'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/blog/BlogCard';
import CategoryPills from '@/components/blog/CategoryPills';
import SearchBar from '@/components/blog/SearchBar';
import { BlogPostMeta } from '@/lib/blog-types';

interface BlogPageClientProps {
    posts: BlogPostMeta[];
    categories: { id: string; label: string }[];
}

export default function BlogPageClient({ posts, categories }: BlogPageClientProps) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = useMemo(() => {
        let result = posts;

        // Filter by category
        if (activeCategory !== 'all') {
            result = result.filter((post) => post.category === activeCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (post) =>
                    post.title.toLowerCase().includes(query) ||
                    post.excerpt.toLowerCase().includes(query) ||
                    post.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        return result;
    }, [posts, activeCategory, searchQuery]);

    return (
        <main className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange/30 relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] left-[-10%] w-[80%] h-[80%] rounded-full bg-brand-orange/5 blur-[200px] animate-pulse-slow mix-blend-screen opacity-30" />
                <div className="absolute bottom-[20%] right-[-15%] w-[60%] h-[60%] rounded-full bg-blue-500/5 blur-[200px] animate-pulse-slow [animation-delay:-5s] mix-blend-screen opacity-20" />
            </div>

            <Header />

            <div className="pt-40 pb-24 relative z-10 flex-grow max-w-6xl mx-auto px-6 w-full">
                <section className="animate-fade-in">
                    {/* Hero */}
                    <div className="space-y-6 mb-14">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-white/50">
                            <span className="w-2 h-2 rounded-full bg-brand-orange shadow-[0_0_10px_rgba(255,87,34,0.8)]" />
                            Career Index Blog
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-none">
                            Career Index <span className="text-brand-orange">Blog</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-white/40 font-medium max-w-2xl leading-relaxed">
                            Latest insights on AI career safety — industry reports, career tips, and breaking AI news.
                        </p>
                    </div>

                    {/* Search & Filters */}
                    <div className="space-y-5 mb-12">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                            <SearchBar value={searchQuery} onChange={setSearchQuery} />
                            <div className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em]">
                                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                            </div>
                        </div>
                        <CategoryPills
                            categories={categories}
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />
                    </div>

                    {/* Blog Grid */}
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post, index) => (
                                <BlogCard key={post.slug} post={post} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 space-y-4">
                            <div className="text-6xl">🔍</div>
                            <h3 className="text-2xl font-bold text-white/50">No articles found</h3>
                            <p className="text-white/30 font-medium">
                                Try a different search term or category filter.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setActiveCategory('all');
                                }}
                                className="mt-4 px-6 py-3 bg-brand-orange/10 border border-brand-orange/20 rounded-full text-sm font-bold text-brand-orange hover:bg-brand-orange/20 transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </section>
            </div>

            <Footer />
        </main>
    );
}
