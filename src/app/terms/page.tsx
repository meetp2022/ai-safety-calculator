"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange/30 relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] rounded-full bg-brand-orange/5 blur-[200px] animate-pulse-slow mix-blend-screen opacity-40" />
            </div>

            <Header />

            <div className="pt-48 pb-24 relative z-10 flex-grow max-w-4xl mx-auto px-6">
                <section className="space-y-16 animate-fade-in">
                    <div className="space-y-6">
                        <h2 className="text-6xl font-black tracking-tight text-white uppercase leading-none">
                            Terms & Conditions
                        </h2>
                        <div className="h-1 w-20 bg-brand-orange" />
                    </div>

                    <div className="space-y-12 text-white/50 leading-relaxed font-medium">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white tracking-tight">1. Algorithmic Nature</h3>
                            <p className="text-lg">
                                The Career Index AI Job Safety Calculator provides estimations based on current architecture benchmarks. These results are <span className="text-brand-orange font-bold">strictly theoretical</span> and do not constitute professional career advice or financial guarantees.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white tracking-tight">2. Assessment Scope</h3>
                            <p className="text-lg">
                                This tool analyzes task-level automation risk. It does not account for specific company culture, legal protections, or individual performance factors which may alter actual job security.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white tracking-tight">3. Local Execution Only</h3>
                            <p className="text-lg">
                                By using this tool, you acknowledge that all data processing occurs on your local hardware. We do not store, log, or transmit any inputs provided during the calculator process.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white tracking-tight">4. Modification of Terms</h3>
                            <p className="text-lg">
                                Terms may be updated to reflect changes in AI modeling standards. Continued use of the platform after updates constitutes acceptance of revised analysis parameters.
                            </p>
                        </div>
                    </div>

                    <div className="pt-16 border-t border-white/10 text-center">
                        <Link href="/" className="inline-block py-6 px-12 bg-white/5 border border-white/10 text-white rounded-full font-bold text-xl hover:bg-white hover:text-brand-dark transition-all uppercase tracking-tight">
                            Return to Protocol
                        </Link>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mt-10">
                            System Node v2.0-Verified // Last Updated: Feb 2026
                        </p>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
