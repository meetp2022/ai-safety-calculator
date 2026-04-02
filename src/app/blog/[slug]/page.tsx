import { getPostBySlug, getAllPosts, getRelatedPosts, formatDate, categoryColors, categoryLabels } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found | Career Index Blog' };

    return {
        title: `${post.title} | Career Index Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(post.slug, post.category);

    return (
        <BlogPostClient
            post={post}
            relatedPosts={relatedPosts}
            formattedDate={formatDate(post.date)}
            categoryColors={categoryColors}
            categoryLabels={categoryLabels}
        />
    );
}
