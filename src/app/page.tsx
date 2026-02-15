'use client';

import { useState } from 'react';
import Calculator from './Calculator';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentStep, setCurrentStep] = useState('category');

  return (
    <main className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange/30 relative overflow-hidden flex flex-col">
      {/* Warm Organic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-brand-orange/10 blur-[200px] animate-pulse-slow mix-blend-screen opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-orange/5 blur-[180px] animate-pulse-slow [animation-delay:-5s] mix-blend-screen opacity-40" />
      </div>

      <Header />

      <div className="pt-48 pb-24 relative z-10 flex-grow">
        {currentStep === 'category' && (
          <div className="max-w-5xl mx-auto px-6 mb-32 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-10 animate-fade-in opacity-0">
              <span className="w-2 h-2 rounded-full bg-brand-orange shadow-[0_0_10px_rgba(255,87,34,0.8)]" />
              A Career Index Product
            </div>
            <h2 className="text-5xl sm:text-8xl font-bold mb-8 leading-[1.1] tracking-tight text-white animate-slide-up opacity-0">
              Check how AI will <br /><span className="text-brand-orange">impact your job</span>
            </h2>
            <p className="text-xl sm:text-2xl text-white/50 font-medium max-w-2xl mx-auto leading-relaxed animate-slide-up opacity-0 [animation-delay:0.3s]">
              Get a detailed career exposure report that shows exactly how AI affects your role — task by task. Understand your risk, find your strengths.
            </p>
            <div className="mt-8 animate-fade-in opacity-0 [animation-delay:0.6s]">
              <p className="text-sm text-white/30 font-semibold">⚡ Takes less than a minute · 100% free · No signup required</p>
            </div>
          </div>
        )}

        <div className="animate-fade-in opacity-0 [animation-delay:0.4s]">
          <Calculator onStepChange={setCurrentStep} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
