'use client';

import { useState } from 'react';
import Calculator from './Calculator';

export default function Home() {
  const [currentStep, setCurrentStep] = useState('category');

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-neon-cyan/30 relative overflow-hidden">
      {/* Intense Neon Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-neon-cyan/20 blur-[150px] animate-aurora mix-blend-screen" />
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-pink/20 blur-[150px] animate-aurora [animation-delay:-7s] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[10%] w-[70%] h-[70%] rounded-full bg-neon-green/20 blur-[150px] animate-aurora [animation-delay:-14s] mix-blend-screen" />
      </div>

      <header className="py-6 px-8 bg-gradient-to-r from-neon-green to-neon-cyan relative z-20 shadow-[0_10px_60px_rgba(57,255,20,0.4)] border-b-2 border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-black flex items-center justify-center font-black text-neon-green text-sm italic">AI</div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic text-black animate-fade-in">
              AI Job Safety <span className="opacity-60 text-black">Calculator</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 animate-fade-in [animation-delay:0.2s]">
            <span className="px-5 py-2 bg-black/10 border-2 border-black/20 rounded-full text-[10px] font-black uppercase tracking-widest text-black/80">
              PRO-NEON EDITION
            </span>
            <div className="w-3 h-3 rounded-full bg-white animate-pulse shadow-[0_0_20px_rgba(255,255,255,1)]" />
          </div>
        </div>
      </header>

      <div className="py-24 relative z-10">
        {currentStep === 'category' && (
          <div className="max-w-7xl mx-auto px-6 mb-24 text-center lg:text-left">
            <h2 className="text-7xl sm:text-9xl font-black mb-8 leading-[0.85] tracking-tighter uppercase italic text-white animate-slide-up opacity-0">
              Will AI <br /><span className="text-neon-green drop-shadow-[0_0_40px_rgba(57,255,20,0.8)]">Displace</span> Your Value?
            </h2>
            <p className="text-2xl text-white/60 font-medium max-w-2xl leading-relaxed animate-slide-up opacity-0 [animation-delay:0.3s]">
              Extreme precision analysis of AI saturation in global workflows.
              Benchmarked against SOTA multi-modal intelligence models.
            </p>
          </div>
        )}

        <div className="animate-fade-in opacity-0 [animation-delay:0.4s]">
          <Calculator onStepChange={setCurrentStep} />
        </div>
      </div>

      <footer className="py-12 bg-gradient-to-r from-neon-green to-neon-cyan relative z-20 mt-auto border-t-4 border-black/20">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-black flex items-center justify-center font-black text-neon-green text-xl italic">AI</div>
              <p className="text-black font-black uppercase italic tracking-tighter text-xl">AI Job Safety Calculator</p>
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <span className="hover:underline cursor-pointer transition-all">About</span>
              <span className="hover:underline cursor-pointer transition-all">Terms and Conditions</span>
              <span className="hover:underline cursor-pointer transition-all">Privacy</span>
            </div>
          </div>
          <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black text-black/50 uppercase tracking-[0.4em]">© 2026 AI Job Safety Systems // NEON // ALL RIGHTS RESERVED</p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-black/60">
              <span className="hover:text-black transition-colors cursor-pointer">Whitepaper</span>
              <span className="hover:text-black transition-colors cursor-pointer">Documentation</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
