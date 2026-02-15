"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange/30 relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-brand-orange/5 blur-[200px] animate-pulse-slow mix-blend-screen opacity-40" />
            </div>

            <Header />

            <div className="pt-48 pb-24 relative z-10 flex-grow max-w-4xl mx-auto px-6">
                <section className="space-y-16 animate-fade-in">
                    <div className="space-y-6">
                        <h2 className="text-6xl font-black tracking-tight text-white uppercase leading-none">
                            Privacy Protocol
                        </h2>
                        <div className="h-1 w-20 bg-brand-orange" />
                    </div>

                    <div className="space-y-12 text-white/50 leading-relaxed font-medium">
                        <div className="p-10 rounded-[3rem] bg-brand-orange/5 border border-brand-orange/20 space-y-4">
                            <h3 className="text-2xl font-bold text-white tracking-tight">Zero-Knowledge Assessment</h3>
                            <p className="text-lg">
                                Our core privacy architect follows a &quot;Zero-Knowledge&quot; principle. We do not want your data, we do not need your data, and we do not collect your data.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-white tracking-tight">Local Storage Only</h3>
                            <p className="text-lg">
                                Any role selections or frequency inputs you provide are held temporarily in your browser&apos;s memory for the duration of the analysis. Once you close the session, this data is purged from existence.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-white tracking-tight">Analytical Cookies</h3>
                            <p className="text-lg">
                                We use minimal, non-identifying cookies only to ensure basic session stability. No tracking pixels or advertising scripts are permitted within the global system protocol.
                            </p>
                        </div>

                        <div className="space-y-4 pt-8">
                            <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-white">Your Rights</h3>
                            <p className="text-lg">
                                As we do not collect personal identifiers, you remain entirely anonymous throughout your workflow analysis journey.
                            </p>
                        </div>
                    </div>

                    <div className="pt-16 text-center">
                        <Link href="/" className="inline-block py-6 px-12 border border-white/10 text-white/40 rounded-full font-bold text-xl hover:text-white hover:border-white transition-all uppercase tracking-tight">
                            Exit Privacy Node
                        </Link>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mt-10">
                            Encryption Standard: AES-256 Equivalent // Zero-Link Verified
                        </p>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
