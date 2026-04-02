'use client';

import React from 'react';

interface MDXContentProps {
    content: string;
}

// Lightweight markdown-to-JSX renderer
// Supports: headings, bold, italic, lists, code blocks, blockquotes, links, horizontal rules, tables, images
export default function MDXContent({ content }: MDXContentProps) {
    const elements = parseMarkdown(content);
    return <div className="prose-blog">{elements}</div>;
}

function parseMarkdown(markdown: string): React.ReactNode[] {
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;
    let key = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Skip empty lines
        if (line.trim() === '') {
            i++;
            continue;
        }

        // Code block
        if (line.trim().startsWith('```')) {
            const lang = line.trim().replace('```', '').trim();
            const codeLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeLines.push(lines[i]);
                i++;
            }
            i++; // skip closing ```
            elements.push(
                <div key={key++} className="my-6 rounded-xl overflow-hidden border border-white/10">
                    {lang && (
                        <div className="px-4 py-2 bg-white/[0.05] text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 border-b border-white/5">
                            {lang}
                        </div>
                    )}
                    <pre className="p-5 bg-white/[0.02] overflow-x-auto text-sm leading-relaxed">
                        <code className="text-brand-orange/80 font-mono">{codeLines.join('\n')}</code>
                    </pre>
                </div>
            );
            continue;
        }

        // Table
        if (line.includes('|') && line.trim().startsWith('|')) {
            const tableLines: string[] = [];
            while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
                tableLines.push(lines[i]);
                i++;
            }
            elements.push(parseTable(tableLines, key++));
            continue;
        }

        // Horizontal rule
        if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line.trim())) {
            elements.push(<hr key={key++} className="my-10 border-white/10" />);
            i++;
            continue;
        }

        // Headings
        if (line.startsWith('#### ')) {
            elements.push(
                <h4 key={key++} className="text-lg font-bold text-white mt-8 mb-3 tracking-tight">
                    {renderInline(line.replace('#### ', ''))}
                </h4>
            );
            i++;
            continue;
        }
        if (line.startsWith('### ')) {
            elements.push(
                <h3 key={key++} className="text-xl font-bold text-white mt-10 mb-4 tracking-tight">
                    {renderInline(line.replace('### ', ''))}
                </h3>
            );
            i++;
            continue;
        }
        if (line.startsWith('## ')) {
            elements.push(
                <h2 key={key++} className="text-2xl sm:text-3xl font-black text-white mt-14 mb-5 tracking-tight">
                    {renderInline(line.replace('## ', ''))}
                </h2>
            );
            i++;
            continue;
        }
        if (line.startsWith('# ')) {
            elements.push(
                <h1 key={key++} className="text-3xl sm:text-4xl font-black text-white mt-16 mb-6 tracking-tight">
                    {renderInline(line.replace('# ', ''))}
                </h1>
            );
            i++;
            continue;
        }

        // Blockquote
        if (line.startsWith('>')) {
            const quoteLines: string[] = [];
            while (i < lines.length && lines[i].startsWith('>')) {
                quoteLines.push(lines[i].replace(/^>\s?/, ''));
                i++;
            }
            elements.push(
                <blockquote
                    key={key++}
                    className="my-6 pl-6 border-l-4 border-brand-orange/40 text-white/60 italic leading-relaxed"
                >
                    {quoteLines.map((ql, qi) => (
                        <p key={qi}>{renderInline(ql)}</p>
                    ))}
                </blockquote>
            );
            continue;
        }

        // Unordered list
        if (/^[-*]\s/.test(line.trim())) {
            const listItems: string[] = [];
            while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) {
                listItems.push(lines[i].trim().replace(/^[-*]\s/, ''));
                i++;
            }
            elements.push(
                <ul key={key++} className="my-4 space-y-2">
                    {listItems.map((item, li) => (
                        <li key={li} className="flex items-start gap-3 text-white/60 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5 shrink-0" />
                            <span>{renderInline(item)}</span>
                        </li>
                    ))}
                </ul>
            );
            continue;
        }

        // Ordered list
        if (/^\d+\.\s/.test(line.trim())) {
            const listItems: string[] = [];
            while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
                listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''));
                i++;
            }
            elements.push(
                <ol key={key++} className="my-4 space-y-2 counter-reset-list">
                    {listItems.map((item, li) => (
                        <li key={li} className="flex items-start gap-3 text-white/60 leading-relaxed">
                            <span className="text-brand-orange font-bold text-sm mt-0.5 shrink-0">{li + 1}.</span>
                            <span>{renderInline(item)}</span>
                        </li>
                    ))}
                </ol>
            );
            continue;
        }

        // Paragraph
        const paraLines: string[] = [];
        while (
            i < lines.length &&
            lines[i].trim() !== '' &&
            !lines[i].startsWith('#') &&
            !lines[i].startsWith('>') &&
            !lines[i].startsWith('```') &&
            !/^[-*]\s/.test(lines[i].trim()) &&
            !/^\d+\.\s/.test(lines[i].trim()) &&
            !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i].trim()) &&
            !(lines[i].includes('|') && lines[i].trim().startsWith('|'))
        ) {
            paraLines.push(lines[i]);
            i++;
        }
        if (paraLines.length > 0) {
            elements.push(
                <p key={key++} className="text-white/60 leading-relaxed my-4 text-[15px]">
                    {renderInline(paraLines.join(' '))}
                </p>
            );
        }
    }

    return elements;
}

function parseTable(lines: string[], key: number): React.ReactNode {
    const rows = lines
        .filter((line) => !/^[\s|:-]+$/.test(line.replace(/\|/g, '').trim()) && line.trim() !== '')
        .filter((line) => !line.replace(/[|\s:-]/g, '').match(/^$/))
        .map((line) =>
            line
                .split('|')
                .map((cell) => cell.trim())
                .filter((cell) => cell !== '')
        );

    if (rows.length === 0) return null;

    // Check if second line is separator
    const hasSeparator = lines.length > 1 && /^[\s|:-]+$/.test(lines[1].replace(/[^|:-\s]/g, ''));
    const headerRow = rows[0];
    const bodyRows = hasSeparator ? rows.slice(1) : rows;

    return (
        <div key={key} className="my-8 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
                {hasSeparator && (
                    <thead>
                        <tr className="bg-white/[0.05] border-b border-white/10">
                            {headerRow.map((cell, ci) => (
                                <th
                                    key={ci}
                                    className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-[0.15em] text-white/50"
                                >
                                    {renderInline(cell)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {(hasSeparator ? bodyRows : rows).map((row, ri) => (
                        <tr key={ri} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                            {row.map((cell, ci) => (
                                <td key={ci} className="px-4 py-3 text-white/50">
                                    {renderInline(cell)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function renderInline(text: string): React.ReactNode {
    // Process inline formatting: bold, italic, code, links
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let partKey = 0;

    while (remaining.length > 0) {
        // Bold: **text**
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
        // Italic: *text* (but not **)
        const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
        // Inline code: `text`
        const codeMatch = remaining.match(/`(.+?)`/);
        // Link: [text](url)
        const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

        // Find the earliest match
        const matches = [
            { type: 'bold', match: boldMatch },
            { type: 'italic', match: italicMatch },
            { type: 'code', match: codeMatch },
            { type: 'link', match: linkMatch },
        ].filter((m) => m.match !== null);

        if (matches.length === 0) {
            parts.push(remaining);
            break;
        }

        // Sort by index position
        matches.sort((a, b) => (a.match?.index || 0) - (b.match?.index || 0));
        const earliest = matches[0];
        const match = earliest.match!;
        const idx = match.index!;

        // Add text before match
        if (idx > 0) {
            parts.push(remaining.substring(0, idx));
        }

        switch (earliest.type) {
            case 'bold':
                parts.push(
                    <strong key={partKey++} className="text-white font-bold">
                        {match[1]}
                    </strong>
                );
                remaining = remaining.substring(idx + match[0].length);
                break;
            case 'italic':
                parts.push(
                    <em key={partKey++} className="text-white/70 italic">
                        {match[1]}
                    </em>
                );
                remaining = remaining.substring(idx + match[0].length);
                break;
            case 'code':
                parts.push(
                    <code key={partKey++} className="px-2 py-0.5 bg-white/[0.06] rounded text-brand-orange/80 text-[13px] font-mono">
                        {match[1]}
                    </code>
                );
                remaining = remaining.substring(idx + match[0].length);
                break;
            case 'link':
                parts.push(
                    <a
                        key={partKey++}
                        href={match[2]}
                        className="text-brand-orange hover:text-brand-orange/80 underline underline-offset-2 transition-colors"
                        target={match[2].startsWith('http') ? '_blank' : undefined}
                        rel={match[2].startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                        {match[1]}
                    </a>
                );
                remaining = remaining.substring(idx + match[0].length);
                break;
        }
    }

    return parts.length === 1 ? parts[0] : <>{parts}</>;
}
