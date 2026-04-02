import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Re-export types and utilities so server components can import everything from '@/lib/blog'
export type { BlogPost, BlogPostMeta } from './blog-types';
export { formatDate, categoryColors, categoryLabels } from './blog-types';

import type { BlogPost, BlogPostMeta } from './blog-types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(): BlogPostMeta[] {
    if (!fs.existsSync(BLOG_DIR)) return [];

    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

    const posts: BlogPostMeta[] = files.map((filename) => {
        const slug = filename.replace(/\.mdx$/, '');
        const filePath = path.join(BLOG_DIR, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        return {
            slug,
            title: data.title || '',
            excerpt: data.excerpt || '',
            date: data.date || '',
            author: data.author || 'Career Index Team',
            category: data.category || 'ai-news',
            tags: data.tags || [],
            coverImage: data.coverImage || '',
            readingTime: data.readingTime || '5 min read',
            featured: data.featured || false,
        };
    });

    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlug(slug: string): BlogPost | null {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date || '',
        author: data.author || 'Career Index Team',
        category: data.category || 'ai-news',
        tags: data.tags || [],
        coverImage: data.coverImage || '',
        readingTime: data.readingTime || '5 min read',
        featured: data.featured || false,
        content,
    };
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
    return getAllPosts().filter((post) => post.category === category);
}

export function getFeaturedPosts(): BlogPostMeta[] {
    return getAllPosts().filter((post) => post.featured);
}

export function getAllCategories(): { id: string; label: string }[] {
    return [
        { id: 'all', label: 'All Posts' },
        { id: 'ai-news', label: 'AI News' },
        { id: 'career-tips', label: 'Career Tips' },
        { id: 'industry-reports', label: 'Industry Reports' },
    ];
}

export function getAllTags(): string[] {
    const posts = getAllPosts();
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
}

export function getRelatedPosts(
    currentSlug: string,
    category: string,
    max = 3
): BlogPostMeta[] {
    return getAllPosts()
        .filter((post) => post.slug !== currentSlug && post.category === category)
        .slice(0, max);
}
