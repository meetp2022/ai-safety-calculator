import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-5xl animate-fade-in">
            <div className="bg-brand-pill/90 backdrop-blur-xl border border-white/10 rounded-full px-3 py-2 sm:px-8 sm:py-3 flex items-center justify-between shadow-2xl overflow-hidden">
                {/* Logo */}
                <Link href="/" className="text-xl sm:text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity flex items-center gap-2">
                    ai <span className="text-brand-orange">calculator</span>
                </Link>

                {/* Nav Links - Desktop */}
                <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold text-white/50">
                    <Link href="/about" className="hover:text-white transition-colors">How it Works</Link>
                    <Link href="/about" className="hover:text-white transition-colors">Reviews</Link>
                    <Link href="/about" className="hover:text-white transition-colors">FAQs</Link>
                    <div className="w-px h-4 bg-white/10 mx-2" />
                    <Link href="/login" className="hover:text-white transition-colors">Login</Link>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="bg-brand-orange text-white px-5 py-2.5 sm:px-7 sm:py-3 rounded-full text-[12px] sm:text-sm font-black uppercase tracking-tight hover:scale-105 active:scale-95 transition-all shadow-[0_8px_30px_rgba(255,87,34,0.4)]">
                        Try Calculator
                    </Link>
                </div>
            </div>
        </header>
    );
}
