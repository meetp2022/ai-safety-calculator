"use client";

import { useState, useMemo, useEffect } from 'react';
import rolesData from '../../data/roles.json';
import tasksData from '../../data/tasks.json';
import taskScoresData from '../../data/task_scores.json';
import { calculateAdvancedScore, calculateTIS, TaskInput } from '../../engine/scoreCalculator';
import { SCORING_CONSTANTS } from '../../engine/modifiers';
import { getRiskBand, RISK_BANDS } from '../../engine/riskBands';

type Step = 'category' | 'role' | 'experience' | 'frequency' | 'value-add' | 'context' | 'results';

const ScoreLegend = () => (
    <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 w-64 space-y-4 animate-fade-in">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-6 underline decoration-blue-500/30 underline-offset-8">Risk Metrics</h3>
        {RISK_BANDS.map((band) => (
            <div key={band.label} className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm space-y-2 group hover:bg-white/10 transition-all cursor-default">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: band.color, color: band.color }} />
                    <span className="text-sm font-bold text-white/90 uppercase tracking-tight">{band.label}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">
                    <span>Exposure Index</span>
                    <span style={{ color: band.color }}>{band.min}-{band.max}</span>
                </div>
            </div>
        ))}
    </div>
);

export default function Calculator() {
    const [step, setStep] = useState<Step>('category');
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [selection, setSelection] = useState({
        category: '',
        role: '',
        experience: 'MID' as keyof typeof SCORING_CONSTANTS.EXPERIENCE_MODIFIERS,
        frequencies: {} as Record<string, keyof typeof SCORING_CONSTANTS.FREQUENCY_WEIGHTS>,
        coreTasks: [] as string[],
        adoptionRate: 1.0,
        judgment: 0.5,
    });

    useEffect(() => {
        setSelection(prev => ({ ...prev, frequencies: {}, coreTasks: [] }));
        setShowBreakdown(false);
    }, [selection.role]);

    const resetCalculator = () => {
        setStep('category');
        setSelection({
            category: '',
            role: '',
            experience: 'MID',
            frequencies: {},
            coreTasks: [],
            adoptionRate: 1.0,
            judgment: 0.5,
        });
        setShowBreakdown(false);
    };

    const currentRoleTasks = useMemo(() => {
        return (tasksData as any)[selection.role] || [];
    }, [selection.role]);

    const handleCalculate = () => setStep('results');

    const renderStep = () => {
        switch (step) {
            case 'category':
                return (
                    <div className="space-y-12 animate-slide-up">
                        <div className="space-y-4 text-center">
                            <h2 className="text-5xl font-black tracking-tight text-white uppercase italic">Select Sector</h2>
                            <p className="text-white/40 font-medium text-lg leading-relaxed">Initialize analysis by defining your industrial environment.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {rolesData.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setSelection({ ...selection, category: cat.name });
                                        setStep('role');
                                    }}
                                    className="p-10 text-left border border-white/5 rounded-3xl hover:border-blue-500 hover:bg-blue-600/5 transition-all duration-700 group relative overflow-hidden bg-slate-900/40"
                                >
                                    <div className="flex justify-between items-center relative z-10">
                                        <div>
                                            <span className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors uppercase italic tracking-tighter">{cat.name}</span>
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-2">Data Set: v2.0-Verified</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500">
                                            <span className="text-white font-black text-xl transform translate-x-0.5">→</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'role':
                const category = rolesData.find(c => c.name === selection.category);
                return (
                    <div className="space-y-10 animate-slide-up">
                        <h2 className="text-4xl font-black tracking-tight text-white uppercase italic text-center">Define Role</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {category?.roles.map(role => (
                                <button
                                    key={role}
                                    onClick={() => {
                                        setSelection({ ...selection, role: role });
                                        setStep('experience');
                                    }}
                                    className="p-10 text-center border border-white/5 rounded-3xl hover:border-blue-500 hover:bg-blue-600/5 transition-all duration-300 group bg-slate-900/40"
                                >
                                    <span className="text-xl font-black text-white/70 group-hover:text-white transition-colors uppercase tracking-tight leading-none">{role}</span>
                                    <div className="h-px bg-white/5 w-1/3 mx-auto mt-4 group-hover:bg-blue-500/50 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'experience':
                return (
                    <div className="space-y-10 animate-slide-up text-center">
                        <h2 className="text-4xl font-black tracking-tight text-white uppercase italic">Market Seniority</h2>
                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {Object.keys(SCORING_CONSTANTS.EXPERIENCE_MODIFIERS).map(level => (
                                <button
                                    key={level}
                                    onClick={() => {
                                        setSelection({ ...selection, experience: level as any });
                                        setStep('frequency');
                                    }}
                                    className="p-12 border border-white/5 rounded-[2.5rem] hover:border-blue-500 hover:bg-blue-600/5 transition-all duration-700 group bg-slate-900/40 flex flex-col items-center gap-4"
                                >
                                    <span className="text-3xl font-black text-white/50 group-hover:text-blue-500 transition-all uppercase tracking-tighter italic">{level}</span>
                                    <p className="text-[10px] font-black tracking-[0.2em] text-white/20 uppercase group-hover:text-white/40">Modifier: {SCORING_CONSTANTS.EXPERIENCE_MODIFIERS[level as keyof typeof SCORING_CONSTANTS.EXPERIENCE_MODIFIERS]}x</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'frequency':
                return (
                    <div className="space-y-12 animate-slide-up pb-24">
                        <h2 className="text-4xl font-black tracking-tight text-white uppercase italic text-center">Task Calibration</h2>
                        <div className="space-y-20">
                            {currentRoleTasks.map((task: string) => (
                                <div key={task} className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-black text-blue-500 px-3 py-1 bg-blue-500/10 rounded-full uppercase tracking-widest">Task</span>
                                        <p className="font-black text-2xl text-white/90 tracking-tighter uppercase leading-none">{task}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-3 p-1 bg-white/5 rounded-2xl border border-white/5">
                                        {Object.keys(SCORING_CONSTANTS.FREQUENCY_WEIGHTS).map(freq => (
                                            <button
                                                key={freq}
                                                onClick={() => setSelection({
                                                    ...selection,
                                                    frequencies: { ...selection.frequencies, [task]: freq as any }
                                                })}
                                                className={`flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${selection.frequencies[task] === freq
                                                    ? 'bg-blue-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.3)] scale-[1.02]'
                                                    : 'text-white/20 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                {freq}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="sticky bottom-8 py-8 px-6 glass rounded-[3rem] shadow-2xl flex gap-4 border border-blue-500/20">
                            <button
                                disabled={Object.keys(selection.frequencies).length < currentRoleTasks.length}
                                onClick={() => setStep('value-add')}
                                className="flex-1 py-6 bg-blue-600 text-white rounded-[1.5rem] font-black text-2xl disabled:opacity-30 transition-all hover:bg-blue-500 uppercase italic tracking-tighter shadow-xl shadow-blue-500/20"
                            >
                                Proceed to Fidelity Step
                            </button>
                        </div>
                    </div>
                );
            case 'value-add':
                return (
                    <div className="space-y-10 animate-slide-up">
                        <div className="space-y-2 text-center">
                            <h2 className="text-4xl font-black tracking-tight text-white uppercase italic">Core Value Identification</h2>
                            <p className="text-white/40 font-medium">Which tasks define your "Human Advantage"? Selecting these increases their impact fidelity.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {currentRoleTasks.map((task: string) => (
                                <button
                                    key={task}
                                    onClick={() => {
                                        const exists = selection.coreTasks.includes(task);
                                        setSelection({
                                            ...selection,
                                            coreTasks: exists
                                                ? selection.coreTasks.filter(t => t !== task)
                                                : [...selection.coreTasks, task]
                                        });
                                    }}
                                    className={`p-8 text-left border rounded-3xl transition-all duration-500 flex justify-between items-center ${selection.coreTasks.includes(task)
                                        ? 'border-blue-500 bg-blue-600/10 text-white'
                                        : 'border-white/5 bg-slate-900/40 text-white/30'
                                        }`}
                                >
                                    <span className="text-xl font-black uppercase tracking-tight">{task}</span>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selection.coreTasks.includes(task) ? 'border-blue-500 bg-blue-500' : 'border-white/10'
                                        }`}>
                                        {selection.coreTasks.includes(task) && <span className="text-white text-[10px]">✓</span>}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setStep('context')}
                            className="w-full py-8 text-blue-500 font-black text-xl uppercase tracking-[0.2em] border border-blue-500/20 rounded-3xl mt-8 hover:bg-blue-500/5 transition-all"
                        >
                            Final Context Mapping →
                        </button>
                    </div>
                );
            case 'context':
                return (
                    <div className="space-y-10 animate-slide-up">
                        <div className="space-y-2 text-center">
                            <h2 className="text-4xl font-black tracking-tight text-white uppercase italic">Environmental Adoption</h2>
                            <p className="text-white/40 font-medium">How aggressively is your specific industry or company adopting AI automation?</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { label: "AI-First / Aggressive", desc: "Rapid displacement of routine operations", val: 1.25 },
                                { label: "Measured Adoption", desc: "Strategic pilot programs for specific tasks", val: 1.0 },
                                { label: "Safe Haven / Low Tech", desc: "Significant cultural or legal barriers to AI", val: 0.8 }
                            ].map(item => (
                                <button
                                    key={item.label}
                                    onClick={() => {
                                        setSelection({ ...selection, adoptionRate: item.val });
                                        handleCalculate();
                                    }}
                                    className="p-10 text-left border border-white/5 rounded-[2.5rem] hover:border-blue-500 hover:bg-blue-600/5 transition-all duration-500 bg-slate-900/40"
                                >
                                    <span className="text-2xl font-black text-white uppercase italic tracking-tighter">{item.label}</span>
                                    <p className="text-white/30 font-bold uppercase text-[10px] tracking-widest mt-2">{item.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'results':
                const taskInputs: TaskInput[] = currentRoleTasks.map((taskName: string) => {
                    const scores = (taskScoresData as any)[taskName] || { as: 0.5, acm: 0.5, af: 0.5, haf: 0.5 };
                    return {
                        name: taskName,
                        ...scores,
                        frequency: selection.frequencies[taskName] || 'WEEKLY',
                        isCoreValue: selection.coreTasks.includes(taskName),
                    };
                });
                const score = calculateAdvancedScore(taskInputs, SCORING_CONSTANTS.EXPERIENCE_MODIFIERS[selection.experience], selection.adoptionRate);
                const band = getRiskBand(score);

                return (
                    <div className="space-y-12 text-center animate-fade-in py-10">
                        {!showBreakdown ? (
                            <>
                                <div className="space-y-8">
                                    <span className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 glow-blue">High Fidelity Index</span>
                                    <h1 className="text-8xl font-black tracking-tighter text-white uppercase italic leading-none">AI Saturation</h1>
                                    <div className="text-[16rem] leading-none font-black tracking-tighter transition-all duration-700 hover:scale-105" style={{ color: band.color, textShadow: `0 0 100px ${band.color}33` }}>
                                        {score}
                                    </div>
                                </div>

                                <div className="p-20 rounded-[5rem] bg-white/5 border border-white/5 glass space-y-8 relative overflow-hidden backdrop-blur-3xl">
                                    <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: band.color }} />
                                    <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-none" style={{ color: band.color }}>{band.label}</h2>
                                    <p className="text-2xl font-medium text-white/60 leading-relaxed max-w-3xl mx-auto italic">
                                        "{band.description}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                                    <div className="p-12 rounded-[4rem] border border-white/5 bg-slate-900/40 space-y-4 group hover:bg-slate-900/60 transition-colors">
                                        <h3 className="font-black text-2xl text-white uppercase tracking-tight italic group-hover:text-blue-400 transition-colors">Model Integrity</h3>
                                        <p className="text-white/30 leading-relaxed font-bold uppercase text-xs tracking-widest">
                                            Score reflects interaction effects between <strong>{selection.role}</strong> task taxonomy and <strong>{selection.adoptionRate}x</strong> adoption environment.
                                        </p>
                                    </div>
                                    <div className="p-12 rounded-[4rem] border border-white/5 bg-slate-900/40 space-y-4 group hover:bg-slate-900/60 transition-colors">
                                        <h3 className="font-black text-2xl text-white uppercase tracking-tight italic group-hover:text-blue-400 transition-colors">Advantage Vector</h3>
                                        <p className="text-white/30 leading-relaxed font-bold uppercase text-xs tracking-widest">
                                            Manual tagging of <strong>{selection.coreTasks.length} Core Value tasks</strong> provided {selection.coreTasks.length > 3 ? 'High' : 'Moderate'} fidelity adjustment to baseline risk.
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-10 text-left animate-slide-up max-w-3xl mx-auto">
                                <div className="flex justify-between items-end mb-12">
                                    <div className="space-y-2">
                                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Diagnostic Breakdown</h2>
                                        <p className="text-white/40 uppercase font-black text-[10px] tracking-widest">Task-Level Exposure Variance</p>
                                    </div>
                                    <button onClick={() => setShowBreakdown(false)} className="text-[10px] font-black uppercase text-blue-500 hover:text-white transition-colors border-b border-blue-500 pb-1">Back to Summary</button>
                                </div>
                                <div className="grid gap-6">
                                    {taskInputs.map((task) => {
                                        const taskTIS = Math.round(calculateTIS(task) * 200 * selection.adoptionRate);
                                        return (
                                            <div key={task.name} className="p-8 rounded-3xl border border-white/5 bg-white/5 group relative overflow-hidden">
                                                <div className="flex justify-between items-center relative z-10">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-3">
                                                            <p className="font-black text-white uppercase tracking-tight">{task.name}</p>
                                                            {task.isCoreValue && <span className="text-[8px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-black tracking-widest uppercase">Core</span>}
                                                        </div>
                                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Frequency: {task.frequency}</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${taskTIS}%` }} />
                                                        </div>
                                                        <span className="font-black text-xl text-white italic">{taskTIS}</span>
                                                    </div>
                                                </div>
                                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="text-[8px] font-black text-white/10 uppercase vertical-text">Exposure Analysis</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="space-y-6 pt-10">
                            <button
                                onClick={resetCalculator}
                                className="w-full py-10 bg-white text-black rounded-[3rem] font-black text-4xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-[0_40px_100px_rgba(0,0,0,0.5)] uppercase italic tracking-tighter"
                            >
                                Analyze New Role
                            </button>

                            <div className="flex justify-center gap-10 items-center">
                                <button
                                    onClick={() => setStep('context')}
                                    className="text-white/40 font-black text-xs uppercase tracking-[0.3em] hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <span>←</span> Edit Parameters
                                </button>
                                {!showBreakdown && (
                                    <button
                                        onClick={() => setShowBreakdown(true)}
                                        className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] hover:text-white transition-colors"
                                    >
                                        Detailed Breakdown
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
        }
    };

    const steps = ['category', 'role', 'experience', 'frequency', 'value-add', 'context', 'results'];
    const currentStepIndex = steps.indexOf(step);
    const progress = (currentStepIndex / (steps.length - 1)) * 100;

    return (
        <div className="relative min-h-screen">
            <ScoreLegend />
            <div className="max-w-7xl mx-auto py-24 px-8">
                <div className="mb-24 space-y-8">
                    <div className="flex justify-between items-end">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">Core Architecture v2.0</span>
                            <div className="text-5xl font-black text-white/5 italic uppercase tracking-tighter leading-none">
                                {step === 'results' ? 'Success' : `Phase 0${currentStepIndex + 1}`}
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            {step !== 'category' && (
                                <button
                                    onClick={() => {
                                        const prev = steps[currentStepIndex - 1];
                                        setStep(prev as any);
                                    }}
                                    className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors group flex items-center gap-2"
                                >
                                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
                                </button>
                            )}
                            <button
                                onClick={resetCalculator}
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-blue-500 transition-colors flex items-center gap-2"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </button>
                        </div>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 rounded-full step-indicator glow-blue transition-all duration-1000 ease-in-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                {renderStep()}
            </div>
        </div>
    );
}
