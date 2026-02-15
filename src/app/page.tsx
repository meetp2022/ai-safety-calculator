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

      <header className="py-8 px-8 bg-gradient-to-r from-neon-cyan to-neon-pink relative z-20 shadow-[0_10px_50px_rgba(0,243,255,0.3)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tighter uppercase italic text-black animate-fade-in">
            AI Job Safety <span className="opacity-70 text-black">Calculator</span>
          </h1>
          <div className="flex items-center gap-4 animate-fade-in [animation-delay:0.2s]">
            <span className="px-4 py-1.5 bg-black/20 border border-black/10 rounded-full text-[10px] font-black uppercase tracking-widest text-black">
              NEON EDITION v1.0
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          </div>
        </div>
      </header>

      <div className="py-24 relative z-10">
        {currentStep === 'category' && (
          <div className="max-w-7xl mx-auto px-6 mb-24 text-center lg:text-left">
            <h2 className="text-7xl sm:text-9xl font-black mb-8 leading-[0.85] tracking-tighter uppercase italic text-white animate-slide-up opacity-0 shadow-neon-pink">
              Will AI <br /><span className="text-neon-cyan drop-shadow-[0_0_30px_rgba(0,243,255,0.8)]">Displace</span> Your Value?
            </h2>
            <p className="text-2xl text-white/60 font-medium max-w-2xl leading-relaxed animate-slide-up opacity-0 [animation-delay:0.3s]">
              High-intensity analysis of AI saturation in professional workflows.
              Calibrated for current transformer architecture maturity.
            </p>
          </div>
        )}

        <div className="animate-fade-in opacity-0 [animation-delay:0.4s]">
          <Calculator onStepChange={setCurrentStep} />
        </div>
      </div>

      <footer className="py-16 bg-gradient-to-r from-neon-green to-neon-yellow relative z-20 shadow-[0_-10px_50px_rgba(57,255,20,0.2)]">
        <div className="max-w-7xl mx-auto px-6 text-black space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Philosophy</h4>
              <p className="text-xs text-black font-bold leading-relaxed">Augmentation over obsolescence. We analyze task automation, not just job loss.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Mathematics</h4>
              <p className="text-xs text-black font-bold leading-relaxed">The TIS System: (AS × ACM × AF) × (1 − HAF). High-precision modeling.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Privacy</h4>
              <p className="text-xs text-black font-bold leading-relaxed">100% Client-Side. No profile data or task responses ever leave your device.</p>
            </div>
          </div>
          <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black text-black/40 uppercase tracking-[0.4em]">© 2026 AI Job Safety Intel // NEON</p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-black/60">
              <span className="hover:text-black transition-colors cursor-pointer border-b-2 border-transparent hover:border-black">Whitepaper</span>
              <span className="hover:text-black transition-colors cursor-pointer border-b-2 border-transparent hover:border-black">API</span>
              <span className="hover:text-black transition-colors cursor-pointer border-b-2 border-transparent hover:border-black">Changelog</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
