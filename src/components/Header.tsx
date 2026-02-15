import Link from 'next/link';

export default function Header() {
    return (
        <header className="py-6 px-8 bg-neon-green relative z-20 shadow-[0_10px_70px_rgba(57,255,20,0.6)] border-b-4 border-black/20">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 hover:scale-[1.02] transition-transform">
                    <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center font-black text-neon-green text-lg italic shadow-[0_0_15px_rgba(57,255,20,0.3)]">AI</div>
                    <h1 className="text-3xl font-black tracking-tighter uppercase italic text-black group cursor-pointer">
                        AI Job Safety <span className="opacity-60 text-black">Calculator</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-4 animate-fade-in [animation-delay:0.2s]">
                    <span className="px-6 py-2 bg-black text-neon-green border-2 border-black/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                        ULTRA-NEON EDITION
                    </span>
                    <div className="w-4 h-4 rounded-full bg-white animate-pulse shadow-[0_0_25px_rgba(255,255,255,1)]" />
                </div>
            </div>
        </header>
    );
}
