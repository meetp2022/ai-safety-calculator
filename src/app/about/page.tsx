"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white font-sans selection:bg-neon-cyan/30 relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-cyan/10 blur-[120px] animate-aurora mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neon-green/10 blur-[120px] animate-aurora [animation-delay:-10s] mix-blend-screen" />
            </div>

            <Header />

            <div className="py-24 relative z-10 flex-grow max-w-4xl mx-auto px-6">
                <section className="space-y-12 animate-fade-in">
                    <div className="space-y-4">
                        <h2 className="text-6xl font-black uppercase italic tracking-tighter text-neon-green drop-shadow-[0_0_20px_rgba(57,255,20,0.5)]">
                            Our Mission
                        </h2>
                        <div className="h-1 w-24 bg-neon-green mb-8" />
                        <p className="text-xl text-white/80 leading-relaxed font-medium">
                            The <span className="text-neon-cyan font-black italic">AI Job Safety Calculator</span> was built to pierce through the noise of AI hype and provide a clinical, data-driven analysis of how modern automation actually interacts with your daily tasks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                        <div className="p-8 rounded-3xl border-2 border-white/5 bg-white/5 backdrop-blur-md space-y-4">
                            <h3 className="text-2xl font-black uppercase italic text-neon-cyan">The TIS System</h3>
                            <p className="text-sm text-white/60 leading-relaxed">
                                We utilize the <span className="font-bold text-white">Task Impact Score (TIS)</span>—a proprietary metric that calculates the intersection of AI Saturated Capabilities (AS), Architecture Context Maturity (ACM), and Human Advantage Factors (HAF).
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl border-2 border-white/5 bg-white/5 backdrop-blur-md space-y-4">
                            <h3 className="text-2xl font-black uppercase italic text-neon-pink">No Data Leakage</h3>
                            <p className="text-sm text-white/60 leading-relaxed">
                                Privacy is our primary protocol. All calculations are performed <span className="font-bold text-white">entirely on your device</span>. No task descriptions or seniority data are ever transmitted to external servers.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 pt-12">
                        <h3 className="text-3xl font-black uppercase italic text-white/40">The Vision</h3>
                        <p className="text-lg text-white/70 leading-relaxed">
                            We believe that the future of work isn&apos;t about human replacement, but about <span className="text-neon-green">augmentation</span>. By understanding which of your tasks are most susceptible to automation, you can pivot your focus toward the &quot;Protected Assets&quot; of human creativity, empathy, and high-level judgment.
                        </p>
                    </div>

                    <div className="pt-24 text-center">
                        <Link href="/" className="inline-block py-6 px-12 bg-neon-green text-black rounded-full font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(57,255,20,0.4)] uppercase italic tracking-tighter">
                            Start Your Analysis
                        </Link>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
