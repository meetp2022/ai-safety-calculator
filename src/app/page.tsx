'use client';

import { useState } from 'react';
import Calculator from './Calculator';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentStep, setCurrentStep] = useState('category');

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-neon-cyan/30 relative overflow-hidden flex flex-col">
      {/* Intense Neon Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-neon-cyan/20 blur-[150px] animate-aurora mix-blend-screen" />
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-pink/20 blur-[150px] animate-aurora [animation-delay:-7s] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[10%] w-[70%] h-[70%] rounded-full bg-neon-green/20 blur-[150px] animate-aurora [animation-delay:-14s] mix-blend-screen" />
      </div>

      <Header />

      <div className="py-24 relative z-10 flex-grow">
        {currentStep === 'category' && (
          <div className="max-w-7xl mx-auto px-6 mb-24 text-center lg:text-left">
            <h2 className="text-7xl sm:text-9xl font-black mb-8 leading-[0.85] tracking-tighter uppercase italic text-white animate-slide-up opacity-0">
              Will AI <br /><span className="text-neon-green drop-shadow-[0_0_50px_rgba(57,255,20,1)]">Displace</span> Your Value?
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

      <Footer />
    </main>
  );
}
