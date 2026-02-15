"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-black text-white font-sans selection:bg-neon-cyan/30 relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-neon-green/10 blur-[150px] animate-aurora mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-neon-cyan/10 blur-[150px] animate-aurora [animation-delay:-8s] mix-blend-screen" />
            </div>

            <Header />

            <div className="py-24 relative z-10 flex-grow max-w-4xl mx-auto px-6">
                <section className="space-y-12 animate-fade-in">
                    <div className="space-y-4">
                        <h2 className="text-6xl font-black uppercase italic tracking-tighter text-neon-cyan drop-shadow-[0_0_20px_rgba(0,243,255,0.5)]">
                            Privacy Protocol
                        </h2>
                        <div className="h-1 w-24 bg-neon-cyan mb-8" />
                    </div>

                    <div className="space-y-8 text-white/70 leading-relaxed">
                        <div className="p-8 rounded-[2rem] bg-neon-green/5 border-2 border-neon-green/20 space-y-4">
                            <h3 className="text-2xl font-black uppercase italic text-neon-green">Zero-Knowledge Assessment</h3>
                            <p>
                                Our core privacy architect follows a &quot;Zero-Knowledge&quot; principle. We do not want your data, we do not need your data, and we do not collect your data.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-3xl font-black uppercase italic text-white/80">Local Storage Only</h3>
                            <p>
                                Any role selections or frequency inputs you provide are held temporarily in your browser&apos;s memory for the duration of the analysis. Once you close the session, this data is purged from existence.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-3xl font-black uppercase italic text-white/80">Analytical Cookies</h3>
                            <p>
                                We use minimal, non-identifying cookies only to ensure basic session stability. No tracking pixels or advertising scripts are permitted within the global neon protocol.
                            </p>
                        </div>

                        <div className="space-y-4 pt-8">
                            <h3 className="text-xl font-bold uppercase tracking-widest text-white">Your Rights</h3>
                            <p>
                                As we do not collect personal identifiers, you remain entirely anonymous throughout your workflow analysis journey.
                            </p>
                        </div>
                    </div>

                    <div className="pt-24 opacity-30 text-center">
                        <Link href="/" className="inline-block py-4 px-8 border-2 border-white/20 text-white/40 rounded-full font-black text-lg hover:border-neon-cyan hover:text-neon-cyan transition-all uppercase italic tracking-widest">
                            Exit Privacy Node
                        </Link>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] mt-8">
                            Encryption Standard: AES-256 Equivalent // Zero-Link Verified
                        </p>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
