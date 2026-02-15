"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange/30 relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-brand-orange/5 blur-[200px] animate-pulse-slow mix-blend-screen opacity-40" />
            </div>

            <Header />

            <div className="pt-48 pb-24 relative z-10 flex-grow max-w-4xl mx-auto px-6">
                <section className="space-y-20 animate-fade-in">
                    <div className="space-y-6">
                        <h2 className="text-6xl font-black tracking-tight text-white uppercase leading-none">
                            Our Mission
                        </h2>
                        <div className="h-1 w-20 bg-brand-orange" />
                        <p className="text-2xl text-white/50 leading-relaxed font-medium">
                            The <span className="text-white font-bold">AI Job Safety Calculator</span> by <span className="text-brand-orange font-bold">Career Index</span> was built to pierce through the noise of AI hype and provide a clinical, data-driven analysis of how modern automation actually interacts with your daily tasks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-md space-y-4">
                            <h3 className="text-2xl font-bold text-white tracking-tight">The TIS System</h3>
                            <p className="text-white/40 leading-relaxed font-medium">
                                We utilize the <span className="text-white">Task Impact Score (TIS)</span>—a proprietary metric that calculates the intersection of AI Saturated Capabilities (AS), Architecture Context Maturity (ACM), and Human Advantage Factors (HAF).
                            </p>
                        </div>
                        <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-md space-y-4">
                            <h3 className="text-2xl font-bold text-white tracking-tight">No Data Leakage</h3>
                            <p className="text-white/40 leading-relaxed font-medium">
                                Privacy is our primary protocol. All calculations are performed <span className="text-white">entirely on your device</span>. No task descriptions or seniority data are ever transmitted to external servers.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-3xl font-bold text-white/30 uppercase tracking-[0.2em]">The Vision</h3>
                        <p className="text-xl text-white/60 leading-relaxed font-medium">
                            We believe that the future of work isn&apos;t about human replacement, but about <span className="text-brand-orange px-2 bg-brand-orange/10 rounded">augmentation</span>. By understanding which of your tasks are most susceptible to automation, you can pivot your focus toward the human advantage of creativity, empathy, and high-level judgment.
                        </p>
                    </div>

                    <div className="pt-12">
                        <Link href="/" className="inline-block py-8 px-16 bg-brand-orange text-white rounded-full font-bold text-3xl hover:scale-105 active:scale-95 transition-all shadow-[0_15px_60px_rgba(255,87,34,0.4)] uppercase tracking-tight">
                            Start Your Analysis
                        </Link>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
