import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white py-24 mt-auto border-t border-gray-100 relative z-10 text-brand-dark">
            <div className="max-w-7xl mx-auto px-6">
                {/* Columns Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">
                    {/* Calculator Section */}
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black text-brand-gray uppercase tracking-[0.2em]">Calculator</h4>
                        <ul className="space-y-4 text-[14px] font-semibold">
                            <li><Link href="/about" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> How it Works</Link></li>
                            <li><Link href="/about" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> What&apos;s Included</Link></li>
                            <li><Link href="/login" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> Membership Login</Link></li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black text-brand-gray uppercase tracking-[0.2em]">Platform</h4>
                        <ul className="space-y-4 text-[14px] font-semibold">
                            <li><Link href="/about" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> Our Why</Link></li>
                            <li><Link href="/about" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> Methodology</Link></li>
                            <li><Link href="/about" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> Contact Us</Link></li>
                            <li><Link href="/about" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Compare Section */}
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black text-brand-gray uppercase tracking-[0.2em]">Compare</h4>
                        <ul className="space-y-4 text-[14px] font-semibold">
                            <li><Link href="/about" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> SOTA Models</Link></li>
                            <li><Link href="/about" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> OpenAI benchmarks</Link></li>
                            <li><Link href="/about" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> Anthropic scores</Link></li>
                        </ul>
                    </div>

                    {/* Library Section */}
                    <div className="space-y-6 lg:col-span-2">
                        <h4 className="text-[11px] font-black text-brand-gray uppercase tracking-[0.2em]">Library</h4>
                        <ul className="space-y-4 text-[14px] font-semibold">
                            <li><Link href="/about" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> The Complete Guide to AI Job Safety</Link></li>
                            <li><Link href="/about" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> Future of Creative Roles 2026</Link></li>
                            <li><Link href="/about" className="group flex items-center gap-2 hover:text-brand-orange transition-colors"><span className="text-brand-orange opacity-40 group-hover:opacity-100 transition-opacity">›</span> Strategic Upskilling Pathways</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Trust Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center py-16 border-t border-gray-100 gap-10">
                    <div className="flex flex-wrap justify-center gap-8 py-4 opacity-10 saturate-0 hover:opacity-100 hover:saturate-100 transition-all duration-700">
                        {/* Abstract Icons for Models */}
                        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center font-bold text-white text-[8px]">GPT</div>
                        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center font-bold text-white text-[8px]">CLA</div>
                        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center font-bold text-white text-[8px]">GEM</div>
                        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center font-bold text-white text-[8px]">LLM</div>
                    </div>
                    <div className="flex items-center gap-4 px-6 py-4 border-2 border-brand-orange/10 rounded-2xl bg-brand-orange/[0.02]">
                        <div className="w-3 h-3 rounded-full bg-brand-orange animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark opacity-60">System Protocol Verified 2026</span>
                    </div>
                </div>

                {/* Bottom Legal Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-100 text-[10px] sm:text-[11px] font-bold text-brand-gray uppercase tracking-[0.3em] gap-6">
                    <p className="text-center md:text-left">© 2026 AI JOB SAFETY CALCULATOR, INC. ALL RIGHTS RESERVED</p>
                    <div className="flex gap-10">
                        <Link href="/terms" className="hover:text-brand-orange transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
