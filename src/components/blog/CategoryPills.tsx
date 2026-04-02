'use client';

interface CategoryPillsProps {
    categories: { id: string; label: string }[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryPills({ categories, activeCategory, onCategoryChange }: CategoryPillsProps) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border transition-all duration-300 hover:scale-105 active:scale-95 ${
                        activeCategory === category.id
                            ? 'bg-brand-orange text-white border-brand-orange shadow-[0_4px_20px_rgba(255,87,34,0.3)]'
                            : 'bg-white/[0.03] text-white/50 border-white/10 hover:border-white/20 hover:text-white/70'
                    }`}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
}
