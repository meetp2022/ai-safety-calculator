'use client';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="relative max-w-md">
            {/* Search Icon */}
            <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
            <input
                type="text"
                placeholder="Search articles..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/20 transition-all duration-300"
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-white/10 text-white/40 hover:bg-white/20 hover:text-white/60 transition-colors text-xs"
                >
                    ✕
                </button>
            )}
        </div>
    );
}
