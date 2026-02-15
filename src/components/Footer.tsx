import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-12 bg-neon-green relative z-20 mt-auto border-t-8 border-black/30 shadow-[0_-20px_80px_rgba(57,255,20,0.4)]">
            <div className="max-w-7xl mx-auto px-6 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center font-black text-neon-green text-2xl italic shadow-lg">AI</div>
                        <p className="text-black font-black uppercase italic tracking-tighter text-2xl">AI Job Safety Calculator</p>
                    </div>
                    <nav className="flex flex-wrap justify-center gap-12 text-xs font-black uppercase tracking-[0.3em] text-black">
                        <Link href="/about" className="hover:scale-110 active:scale-95 transition-all cursor-pointer underline decoration-2 underline-offset-4 decoration-black/20 hover:decoration-black">About</Link>
                        <Link href="/terms" className="hover:scale-110 active:scale-95 transition-all cursor-pointer underline decoration-2 underline-offset-4 decoration-black/20 hover:decoration-black">Terms</Link>
                        <Link href="/privacy" className="hover:scale-110 active:scale-95 transition-all cursor-pointer underline decoration-2 underline-offset-4 decoration-black/20 hover:decoration-black">Privacy</Link>
                    </nav>
                </div>
                <div className="pt-8 border-t-2 border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] font-black text-black/60 uppercase tracking-[0.4em]">© 2026 AI Job Safety Systems // GLOBAL NEON PROTOCOL // ALL RIGHTS RESERVED</p>
                    <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-black/70">
                        <span className="hover:text-black transition-colors cursor-pointer">Whitepaper</span>
                        <span className="hover:text-black transition-colors cursor-pointer">Documentation</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
