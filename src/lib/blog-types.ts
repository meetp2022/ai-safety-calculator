// Shared types and utilities for the blog system
// This file can be safely imported from both client and server components

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: 'ai-news' | 'career-tips' | 'industry-reports';
    tags: string[];
    coverImage: string;
    readingTime: string;
    featured: boolean;
    content: string;
}

export interface BlogPostMeta {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: 'ai-news' | 'career-tips' | 'industry-reports';
    tags: string[];
    coverImage: string;
    readingTime: string;
    featured: boolean;
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export const categoryColors: Record<string, { bg: string; text: string }> = {
    'ai-news': { bg: 'bg-blue-500/20', text: 'text-blue-400' },
    'career-tips': { bg: 'bg-brand-orange/20', text: 'text-brand-orange' },
    'industry-reports': { bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
};

export const categoryLabels: Record<string, string> = {
    'ai-news': 'AI News',
    'career-tips': 'Career Tips',
    'industry-reports': 'Industry Reports',
};
