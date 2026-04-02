import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Career Index — AI Career Safety Insights',
    description:
        'Latest insights on AI career safety — industry reports, career tips, and breaking AI news. Stay informed about how artificial intelligence impacts your career.',
    openGraph: {
        title: 'Career Index Blog — AI Career Safety Insights',
        description:
            'Latest insights on AI career safety — industry reports, career tips, and breaking AI news.',
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
