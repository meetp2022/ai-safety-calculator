'use client';

import { useState } from 'react';
import Calculator from './Calculator';

export default function Home() {
  const [currentStep, setCurrentStep] = useState('category');

  return (
    <main className="min-h-screen bg-[#030712] text-white font-sans selection:bg-blue-500/30 relative overflow-hidden">
      {/* Aesthetic Background Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#080b1a_0%,transparent_50%)] pointer-events-none" />

      <header className="py-10 px-8 border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tighter uppercase italic">
            AI Job Safety <span className="text-blue-500">Calculator</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40">
              Rule-Based v1.0
            </span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
        </div>
      </header>

      <div className="py-24">
        {currentStep === 'category' && (
          <div className="max-w-7xl mx-auto px-6 mb-20 text-center lg:text-left transition-all duration-700 animate-fade-in">
            <h2 className="text-6xl sm:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase italic text-white/90">
              Will AI <br /><span className="text-blue-600">Displace</span> Your Value?
            </h2>
            <p className="text-2xl text-white/40 font-medium max-w-2xl leading-relaxed">
              A surgical, task-level analysis of AI saturation in professional workflows.
              Calibrated for current transformer architecture maturity.
            </p>
          </div>
        )}

        <Calculator onStepChange={setCurrentStep} />
      </div>

      <footer className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Philosophy</h4>
              <p className="text-xs text-white/30 font-medium leading-relaxed">Focusing on task automation vs job replacement. We believe in augmentation over obsolescence.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Mathematics</h4>
              <p className="text-xs text-white/30 font-medium leading-relaxed">Using the TIS (Task Impact Score) model: (AS × ACM × AF) × (1 − HAF).</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Privacy</h4>
              <p className="text-xs text-white/30 font-medium leading-relaxed">Calculations are local. No profile data or task responses are stored on external servers.</p>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">© 2026 AI Job Safety Intel</p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/40">
              <span className="hover:text-blue-500 transition-colors cursor-pointer">Whitepaper</span>
              <span className="hover:text-blue-500 transition-colors cursor-pointer">API</span>
              <span className="hover:text-blue-500 transition-colors cursor-pointer">Changelog</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
