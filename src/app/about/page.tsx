"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        {
            q: "What is the AI Job Safety Calculator?",
            a: "It is a specialized tool designed to provide a realistic, data-driven analysis of how modern AI and automation technologies affect your specific role by breaking it down task-by-task."
        },
        {
            q: "How is the Task Impact Score (TIS) calculated?",
            a: "The TIS uses our proprietary algorithm based on AI Saturated Capabilities (AS), Architecture Context Maturity (ACM), and Human Advantage Factors (HAF). We calculate the theoretical AI capability vs. the human judgment required for each task."
        },
        {
            q: "Is my data safe and private?",
            a: "Yes. All calculations are performed entirely on your device (client-side). No task descriptions, seniority data, or personal details are ever sent to or stored on our servers."
        },
        {
            q: "Why do you ask for my experience level?",
            a: "Experience heavily modifies our risk analysis. Entry-level tasks typically follow standardized patterns that are easier for AI to replicate, whereas senior roles rely intensely on nuanced judgment, strategic context, and complex human interactions—which act as a strong moat against automation."
        },
        {
            q: "If my score is high, does that mean I will lose my job?",
            a: "Not necessarily. A high score signifies that a large portion of your recurring tasks can be augmented or automated. This is a strong signal to pivot your focus toward 'Human Advantage' skills—such as creativity, empathy, and high-level judgment—rather than manual execution."
        },
        {
            q: "How often is the underlying data updated?",
            a: "We continuously monitor AI capability benchmarks across Technology, Business, and Creative sectors, updating our dataset to reflect the latest state-of-the-art models to ensure your score reflects current realities."
        },
        {
            q: "Is this tool really 100% free?",
            a: "Yes, the calculator is completely free to use with no hidden paywalls or signup required. Our mission is to democratize access to career intelligence in the emerging AI era."
        }
    ];

    return (
        <main className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange/30 relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-brand-orange/5 blur-[200px] animate-pulse-slow mix-blend-screen opacity-40" />
            </div>

            <Header />

            <div className="pt-48 pb-24 relative z-10 flex-grow max-w-4xl mx-auto px-6">
                <section className="space-y-20 animate-fade-in">
                    <div id="how-it-works" className="space-y-6 scroll-mt-32">
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

                    <div id="reviews" className="space-y-12 pt-10 border-t border-white/10 scroll-mt-32">
                        <div className="space-y-4">
                            <h3 className="text-4xl font-black tracking-tight text-white uppercase leading-none">
                                What Users Say
                            </h3>
                            <p className="text-lg text-white/40 font-medium">Real feedback from professionals who used our tool.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-md space-y-4">
                                <div className="flex gap-1 text-brand-orange text-lg">★★★★★</div>
                                <p className="text-white/50 leading-relaxed font-medium italic">&ldquo;Finally a tool that breaks down AI risk by actual tasks instead of vague job titles. The task-level analysis gave me a clear picture of where to upskill.&rdquo;</p>
                                <p className="text-sm font-bold text-white/30 uppercase tracking-widest">— Marketing Manager</p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-md space-y-4">
                                <div className="flex gap-1 text-brand-orange text-lg">★★★★★</div>
                                <p className="text-white/50 leading-relaxed font-medium italic">&ldquo;I was worried AI would replace my role entirely. This showed me that 60% of my work is actually in the human-advantage zone. Very reassuring.&rdquo;</p>
                                <p className="text-sm font-bold text-white/30 uppercase tracking-widest">— UX Designer</p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-md space-y-4">
                                <div className="flex gap-1 text-brand-orange text-lg">★★★★☆</div>
                                <p className="text-white/50 leading-relaxed font-medium italic">&ldquo;Clean interface, zero data collection, and genuinely useful output. I shared it with my whole team.&rdquo;</p>
                                <p className="text-sm font-bold text-white/30 uppercase tracking-widest">— Engineering Lead</p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-md space-y-4">
                                <div className="flex gap-1 text-brand-orange text-lg">★★★★★</div>
                                <p className="text-white/50 leading-relaxed font-medium italic">&ldquo;The privacy-first approach sold me. Everything runs locally — no signup, no data harvesting. Exactly what career tools should be.&rdquo;</p>
                                <p className="text-sm font-bold text-white/30 uppercase tracking-widest">— Data Analyst</p>
                            </div>
                        </div>
                    </div>

                    <div id="faqs" className="space-y-12 pt-10 border-t border-white/10 scroll-mt-32">
                        <div className="space-y-4">
                            <h3 className="text-4xl font-black tracking-tight text-white uppercase leading-none">
                                Frequently Asked Questions
                            </h3>
                            <p className="text-lg text-white/40 font-medium">Everything you need to know about the product and billing.</p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border border-white/5 rounded-3xl bg-white/[0.02] overflow-hidden transition-colors hover:border-brand-orange/30">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/[0.02] transition-colors"
                                    >
                                        <span className="text-xl font-bold text-white pr-8">{faq.q}</span>
                                        <span className={`text-brand-orange text-2xl font-light transition-transform duration-300 ${openFaq === index ? 'rotate-45' : ''}`}>+</span>
                                    </button>
                                    <div className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-white/50 text-lg leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-12 text-center">
                        <Link href="/" className="inline-block py-6 px-12 bg-brand-orange text-white rounded-full font-bold text-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_15px_60px_rgba(255,87,34,0.4)] uppercase tracking-tight">
                            Start Your Analysis
                        </Link>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
