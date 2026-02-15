"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black text-white font-sans selection:bg-neon-cyan/30 relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neon-pink/10 blur-[120px] animate-aurora mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-cyan/10 blur-[120px] animate-aurora [animation-delay:-12s] mix-blend-screen" />
            </div>

            <Header />

            <div className="py-24 relative z-10 flex-grow max-w-4xl mx-auto px-6">
                <section className="space-y-12 animate-fade-in">
                    <div className="space-y-4">
                        <h2 className="text-6xl font-black uppercase italic tracking-tighter text-neon-pink drop-shadow-[0_0_20px_rgba(255,0,255,0.5)]">
                            Terms & Conditions
                        </h2>
                        <div className="h-1 w-24 bg-neon-pink mb-8" />
                    </div>

                    <div className="space-y-8 text-white/70 leading-relaxed">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black uppercase italic text-white">1. Algorithmic Nature</h3>
                            <p>
                                The AI Job Safety Calculator provides estimations based on current architecture benchmarks. These results are <span className="text-neon-pink italic font-bold">strictly theoretical</span> and do not constitute professional career advice or financial guarantees.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-black uppercase italic text-white">2. Assessment Scope</h3>
                            <p>
                                This tool analyzes task-level automation risk. It does not account for specific company culture, legal protections, or individual performance factors which may alter actual job security.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-black uppercase italic text-white">3. Local Execution Only</h3>
                            <p>
                                By using this tool, you acknowledge that all data processing occurs on your local hardware. We do not store, log, or transmit any inputs provided during the calculator process.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-black uppercase italic text-white">4. Modification of Terms</h3>
                            <p>
                                Terms may be updated to reflect changes in AI modeling standards. Continued use of the platform after updates constitutes acceptance of revised analysis parameters.
                            </p>
                        </div>
                    </div>

                    <div className="pt-24 border-t border-white/10 text-center">
                        <Link href="/" className="inline-block py-4 px-8 bg-neon-pink/10 border-2 border-neon-pink text-neon-pink rounded-full font-black text-lg hover:bg-neon-pink hover:text-black transition-all uppercase italic tracking-widest">
                            Return to Protocol
                        </Link>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mt-8">
                            Protocol v2.0-Verified // Last Iteration: Feb 2026
                        </p>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
