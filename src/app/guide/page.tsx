"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function GuidePage() {
    return (
        <main className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange/30 relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] right-[-5%] w-[70%] h-[70%] rounded-full bg-brand-orange/5 blur-[220px] animate-pulse-slow mix-blend-screen opacity-30" />
                <div className="absolute bottom-[10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-orange/5 blur-[200px] animate-pulse-slow [animation-delay:-3s] mix-blend-screen opacity-20" />
            </div>

            <Header />

            <div className="pt-48 pb-32 relative z-10 flex-grow max-w-5xl mx-auto px-6">
                <section className="space-y-24 animate-fade-in">
                    {/* Hero Header */}
                    <div className="space-y-8 text-center max-w-3xl mx-auto">
                        <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-white leading-none uppercase">
                            The Complete <span className="text-brand-orange">Guide</span> to Career Safety
                        </h1>
                        <p className="text-2xl text-white/40 leading-relaxed font-medium">
                            A clinical framework for navigating the 2026 labor market, where task-level automation meets human potential.
                        </p>
                    </div>

                    {/* Section 1: The New Reality */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-bold tracking-tight text-white border-l-4 border-brand-orange pl-6">01. Task Analysis vs. Job Loss</h2>
                            <p className="text-xl text-white/60 leading-relaxed">
                                AI doesn&apos;t usually take entire jobs—it automates specific **tasks**. Career safety is found by identifying which 30-70% of your role can be handed to a model, and which part requires your unique human judgment.
                            </p>
                            <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 space-y-4">
                                <h3 className="text-lg font-bold text-brand-orange uppercase tracking-widest">Strategy</h3>
                                <p className="text-white/40">Use the Career Index Calculator to map your weekly task variance. Focus on upskilling in the tasks with the lowest TIS scores.</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-4xl font-bold tracking-tight text-white border-l-4 border-white/10 pl-6 text-white/30">02. The Human Advantage (HAF)</h2>
                            <p className="text-xl text-white/60 leading-relaxed">
                                Human Advantage Factors (HAF) are the metrics that matter in 2026. These include complex creativity, high-stakes empathy, physical interaction in localized spaces, and strategic cross-domain synthesis.
                            </p>
                            <ul className="space-y-4 text-white/40 font-medium">
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> Complex Negotiation & Influence</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> Multi-modal Strategic Judgment</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> High-Empathy Crisis Management</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 2: Actionable Steps */}
                    <div className="space-y-12">
                        <h2 className="text-5xl font-black text-center text-white/20 uppercase tracking-[0.2em]">The 2026 Action Plan</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            <div className="p-10 rounded-[3rem] bg-brand-orange/5 border border-brand-orange/20 space-y-6">
                                <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center font-bold text-2xl">01</div>
                                <h3 className="text-xl font-bold text-white">Audit Monthly</h3>
                                <p className="text-white/40 leading-relaxed text-sm">Models update weekly. Re-run your Career Index analysis every 30 days to see if new capabilities have entered your field.</p>
                            </div>
                            <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 space-y-6">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-bold text-2xl">02</div>
                                <h3 className="text-xl font-bold text-white">Pivotal Choice</h3>
                                <p className="text-white/40 leading-relaxed text-sm">Identify your most automated task. Instead of fighting the automation, learn to oversee the model performing that task.</p>
                            </div>
                            <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 space-y-6">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-bold text-2xl">03</div>
                                <h3 className="text-xl font-bold text-white">Niche Mastery</h3>
                                <p className="text-white/40 leading-relaxed text-sm">Deep specialization in high-complexity, niche areas remains the strongest defense against general-purpose LLM automation.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="pt-16 border-t border-white/5 text-center space-y-8">
                        <h3 className="text-3xl font-bold text-white uppercase tracking-tight">Ready to map your defense?</h3>
                        <Link href="/" className="inline-block py-8 px-16 bg-brand-orange text-white rounded-full font-bold text-3xl hover:scale-105 active:scale-95 transition-all shadow-[0_15px_60px_rgba(255,87,34,0.4)] uppercase tracking-tight">
                            Run Career Audit
                        </Link>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
