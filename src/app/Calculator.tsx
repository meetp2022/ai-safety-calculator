"use client";

import { useState, useMemo, useEffect } from 'react';
import rolesData from '../../data/roles.json';
import tasksData from '../../data/tasks.json';
import taskScoresData from '../../data/task_scores.json';
import { calculateAdvancedScore, calculateTIS, TaskInput } from '../../engine/scoreCalculator';
import { SCORING_CONSTANTS } from '../../engine/modifiers';
import { getRiskBand, RISK_BANDS } from '../../engine/riskBands';

interface RoleCategory {
    id: string;
    name: string;
    roles: string[];
}

interface TaskScore {
    as: number;
    acm: number;
    af: number;
    haf: number;
}

type Step = 'category' | 'role' | 'experience' | 'frequency' | 'value-add' | 'context' | 'results';

const ScoreLegend = () => (
    <div className="space-y-6 animate-fade-in">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-gray mb-4">Risk Metrics</h3>
        <div className="grid grid-cols-1 gap-4">
            {RISK_BANDS.map((band) => (
                <div key={band.label} className="p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md space-y-2 group hover:border-white/10 transition-all cursor-default">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: band.color }} />
                        <span className="text-[11px] font-bold text-white uppercase tracking-tight">{band.label}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default function Calculator({ onStepChange }: { onStepChange?: (step: string) => void }) {
    const [step, setStep] = useState<Step>('category');
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [showIntegrityDetails, setShowIntegrityDetails] = useState(false);
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
        onStepChange?.(step);
    }, [step, onStepChange]);

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
        setShowIntegrityDetails(false);
    };

    const currentRoleTasks = useMemo(() => {
        return (tasksData as Record<string, string[]>)[selection.role] || [];
    }, [selection.role]);

    const handleCalculate = () => setStep('results');

    const renderStep = () => {
        switch (step) {
            case 'category':
                return (
                    <div className="space-y-12 animate-slide-up">
                        <div className="space-y-4 text-center">
                            <h2 className="text-5xl font-bold tracking-tight text-white">Select Sector</h2>
                            <p className="text-white/40 font-medium text-lg leading-relaxed max-w-xl mx-auto">Initialize analysis by defining your industrial environment.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(rolesData as RoleCategory[]).map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setSelection({ ...selection, category: cat.name });
                                        setStep('role');
                                    }}
                                    className="p-10 text-left border border-white/5 rounded-[2.5rem] hover:border-brand-orange hover:bg-brand-orange/5 bg-white/[0.03] backdrop-blur-md transition-all duration-500 group relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-center relative z-10">
                                        <div>
                                            <span className="text-3xl font-bold text-white group-hover:text-brand-orange transition-colors tracking-tight">{cat.name}</span>
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-3">Data Set: v2.0-Verified</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-500">
                                            <span className="text-white font-bold text-xl">→</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'role':
                return (
                    <div className="space-y-10 animate-slide-up">
                        <h2 className="text-4xl font-bold tracking-tight text-white text-center">Define Role</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(rolesData as RoleCategory[]).find(c => c.name === selection.category)?.roles.map(role => (
                                <button
                                    key={role}
                                    onClick={() => {
                                        setSelection({ ...selection, role });
                                        setStep('experience');
                                    }}
                                    className="p-10 text-center border border-white/5 rounded-3xl hover:border-brand-orange/50 hover:bg-white/5 backdrop-blur-md transition-all duration-300 group bg-white/[0.02]"
                                >
                                    <span className="text-xl font-bold text-white/50 group-hover:text-white transition-colors tracking-tight leading-none">{role}</span>
                                    <div className="h-1 bg-white/5 w-1/4 mx-auto mt-6 group-hover:bg-brand-orange transition-colors rounded-full" />
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'experience':
                return (
                    <div className="space-y-10 animate-slide-up text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-white">Market Seniority</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {Object.keys(SCORING_CONSTANTS.EXPERIENCE_MODIFIERS).map(level => (
                                <button
                                    key={level}
                                    onClick={() => {
                                        setSelection({ ...selection, experience: level as keyof typeof SCORING_CONSTANTS.EXPERIENCE_MODIFIERS });
                                        setStep('frequency');
                                    }}
                                    className={`p-12 border rounded-[2.5rem] backdrop-blur-md transition-all duration-500 group flex flex-col items-center gap-4 ${selection.experience === level ? 'border-brand-orange bg-brand-orange text-white shadow-[0_15px_40px_rgba(255,87,34,0.3)] scale-[1.05]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                                >
                                    <span className={`text-5xl font-bold transition-all tracking-tighter ${selection.experience === level ? 'text-white' : 'text-white/20 group-hover:text-white/40'}`}>{level}</span>
                                    <p className={`text-[10px] font-black tracking-[0.2em] uppercase transition-all ${selection.experience === level ? 'text-white/60' : 'text-white/10'}`}>Modifier: {SCORING_CONSTANTS.EXPERIENCE_MODIFIERS[level as keyof typeof SCORING_CONSTANTS.EXPERIENCE_MODIFIERS]}x</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'frequency':
                return (
                    <div className="space-y-12 animate-slide-up pb-24">
                        <h2 className="text-4xl font-bold tracking-tight text-white text-center">Task Calibration</h2>
                        <div className="space-y-20">
                            {currentRoleTasks.map((task: string) => (
                                <div key={task} className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-black text-brand-orange px-3 py-1 bg-brand-orange/10 rounded-full uppercase tracking-widest">Task</span>
                                        <p className="font-bold text-2xl text-white/90 tracking-tight uppercase leading-none">{task}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5">
                                        {Object.keys(SCORING_CONSTANTS.FREQUENCY_WEIGHTS).map(freq => (
                                            <button
                                                key={freq}
                                                onClick={() => setSelection({
                                                    ...selection,
                                                    frequencies: { ...selection.frequencies, [task]: freq as keyof typeof SCORING_CONSTANTS.FREQUENCY_WEIGHTS }
                                                })}
                                                className={`flex-1 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all duration-300 ${selection.frequencies[task] === freq
                                                    ? 'bg-brand-orange text-white shadow-lg scale-[1.02]'
                                                    : 'text-white/30 hover:text-white/60 hover:bg-white/5'
                                                    }`}
                                            >
                                                {freq}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="sticky bottom-8 py-8 px-6 bg-brand-pill/90 backdrop-blur-2xl rounded-[3rem] shadow-2xl flex gap-4 border border-white/10">
                            <button
                                disabled={Object.keys(selection.frequencies).length < currentRoleTasks.length}
                                onClick={() => setStep('value-add')}
                                className="flex-1 py-7 bg-brand-orange text-white rounded-full font-bold text-2xl disabled:opacity-20 transition-all hover:scale-[1.02] shadow-[0_15px_40px_rgba(255,87,34,0.3)] uppercase tracking-tight"
                            >
                                Continue Analysis
                            </button>
                        </div>
                    </div>
                );
            case 'value-add':
                return (
                    <div className="space-y-10 animate-slide-up">
                        <div className="space-y-4 text-center">
                            <h2 className="text-4xl font-bold tracking-tight text-white">Value Identification</h2>
                            <p className="text-white/40 font-medium max-w-2xl mx-auto text-lg leading-relaxed">Which tasks rely on your unique human judgment, empathy, or complex creativity? Select these to weight them as &quot;Protected Assets&quot;.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
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
                                    className={`p-9 text-left border rounded-[2.5rem] transition-all duration-500 flex justify-between items-center group relative overflow-hidden backdrop-blur-xl ${selection.coreTasks.includes(task)
                                        ? 'bg-brand-orange/10 border-brand-orange shadow-[0_10px_40px_rgba(255,87,34,0.2)] scale-[1.02]'
                                        : 'bg-white/5 border-white/5 hover:border-white/10'
                                        }`}
                                >
                                    <div className="relative z-10 flex items-center gap-6">
                                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all ${selection.coreTasks.includes(task) ? 'bg-brand-orange border-brand-orange text-white' : 'border-white/10 text-white/20 group-hover:border-white/30'}`}>
                                            {selection.coreTasks.includes(task) ? '✓' : ''}
                                        </div>
                                        <span className={`text-xl font-bold uppercase tracking-tight transition-all ${selection.coreTasks.includes(task) ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>{task}</span>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border transition-all ${selection.coreTasks.includes(task) ? 'border-brand-orange text-brand-orange bg-brand-orange/10' : 'border-white/10 text-white/10 group-hover:text-white/20'}`}>Asset</span>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setStep('context')}
                            className="w-full py-8 text-white bg-brand-orange font-bold text-2xl uppercase tracking-tight rounded-full mt-10 hover:scale-[1.02] shadow-[0_15px_40px_rgba(255,87,34,0.3)] transition-all"
                        >
                            Final Context Mapping
                        </button>
                    </div>
                );
            case 'context':
                return (
                    <div className="space-y-10 animate-slide-up">
                        <div className="space-y-4 text-center">
                            <h2 className="text-4xl font-bold tracking-tight text-white">Environmental Adoption</h2>
                            <p className="text-white/40 font-medium text-lg leading-relaxed">How aggressively is your specific industry or company adopting AI automation?</p>
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
                                    className="p-10 text-left border border-white/5 rounded-[3rem] hover:border-brand-orange hover:bg-brand-orange/5 transition-all duration-500 bg-white/[0.02] group relative overflow-hidden"
                                >
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="space-y-2">
                                            <span className="text-3xl font-bold text-white group-hover:text-brand-orange transition-colors tracking-tight">{item.label}</span>
                                            <p className="text-white/30 font-bold uppercase text-[10px] tracking-widest group-hover:text-white/50 transition-colors">{item.desc}</p>
                                        </div>
                                        <div className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-500">
                                            <span className="text-white font-bold text-xl">→</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'results':
                const taskInputs: TaskInput[] = currentRoleTasks.map((taskName: string) => {
                    const scores = (taskScoresData as Record<string, TaskScore>)[taskName] || { as: 0.5, acm: 0.5, af: 0.5, haf: 0.5 };
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
                    <div className="animate-fade-in py-10">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-16 space-y-12 lg:space-y-0">
                            {/* Dashboard Left: Score & Identity */}
                            <div className="lg:col-span-4 space-y-10 text-center lg:text-left flex flex-col justify-center">
                                <div className="space-y-4">
                                    <span className="inline-block px-5 py-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange mb-4 w-fit mx-auto lg:mx-0">Intelligence Diagnostic</span>
                                    <h1 className="text-6xl font-black tracking-tight text-white uppercase leading-none">Career <br />Exposure</h1>
                                </div>
                                <div className="relative inline-block w-fit mx-auto lg:mx-0">
                                    <div className="text-[11rem] leading-none font-black tracking-tighter transition-all duration-700 hover:scale-105 select-none text-white">
                                        {score}
                                    </div>
                                    <div className="absolute -top-4 -right-8 w-24 h-24 bg-brand-orange/20 blur-[60px] rounded-full animate-pulse" />
                                </div>
                            </div>

                            {/* Dashboard Center: Impact Card & Secondary Stats */}
                            <div className="lg:col-span-8 space-y-8">
                                <div className="p-12 sm:p-16 rounded-[4rem] bg-white text-brand-dark relative overflow-hidden group shadow-2xl">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                                        <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-none" style={{ color: band.color }}>{band.label}</h2>
                                        <div className="px-6 py-2 bg-brand-dark/5 rounded-full text-[12px] font-bold uppercase tracking-widest text-brand-dark/40">Protocol Index: {score}/100</div>
                                    </div>
                                    <p className="text-2xl sm:text-3xl font-medium text-brand-dark/80 leading-snug tracking-tight">
                                        {band.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div
                                        onClick={() => setShowIntegrityDetails(!showIntegrityDetails)}
                                        className={`p-10 rounded-[3.5rem] border transition-all cursor-pointer group backdrop-blur-md ${showIntegrityDetails ? 'bg-brand-orange/10 border-brand-orange' : 'border-white/5 bg-white/5 hover:border-white/10'}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-4">
                                                <h3 className={`font-bold text-2xl tracking-tight transition-colors ${showIntegrityDetails ? 'text-brand-orange' : 'text-white'}`}>Integrity Vector</h3>
                                                <p className="text-white/30 leading-relaxed font-bold uppercase text-[10px] tracking-widest">
                                                    Analysis for <strong className="text-white">{selection.role}</strong>
                                                </p>
                                            </div>
                                            <span className={`text-2xl transition-transform ${showIntegrityDetails ? 'rotate-180 text-brand-orange' : 'text-white/20'} font-bold`}>↓</span>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setShowBreakdown(!showBreakdown)}
                                        className={`p-10 rounded-[3.5rem] border transition-all cursor-pointer group backdrop-blur-md ${showBreakdown ? 'bg-brand-orange/10 border-brand-orange' : 'border-white/5 bg-white/5 hover:border-white/10'}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-4">
                                                <h3 className={`font-bold text-2xl tracking-tight transition-colors ${showBreakdown ? 'text-brand-orange' : 'text-white/60'}`}>Diagnostic Report</h3>
                                                <p className="text-white/30 leading-relaxed font-bold uppercase text-[10px] tracking-widest">
                                                    Mapped <strong className="text-white">{currentRoleTasks.length}</strong> task nodes
                                                </p>
                                            </div>
                                            <span className={`text-2xl transition-transform ${showBreakdown ? 'rotate-180 text-brand-orange' : 'text-white/20'} font-bold`}>↓</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Dashboard Right: Metric Legend */}
                        <div className="lg:col-span-3 lg:border-l lg:border-white/5 lg:pl-12">
                            <ScoreLegend />
                        </div>


                        {showBreakdown && (
                            <div className="mt-12 pt-16 border-t border-white/5 text-left animate-slide-up max-w-5xl mx-auto space-y-12">
                                <div className="flex flex-col md:flex-row justify-between items-center bg-white/[0.02] p-12 rounded-[3.5rem] border border-white/5 gap-8">
                                    <div className="space-y-3">
                                        <h2 className="text-4xl font-bold text-white tracking-tight">Variance Matrix</h2>
                                        <p className="text-white/30 uppercase font-black text-[10px] tracking-[0.3em]">Impact Score (TIS) Diagnostic</p>
                                    </div>
                                    <div className="flex bg-brand-dark p-6 rounded-3xl border border-white/5 gap-10">
                                        <div className="space-y-2 text-center">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">0 Index</p>
                                            <p className="text-xs font-bold text-white uppercase">Human Driven</p>
                                        </div>
                                        <div className="w-px h-10 bg-white/5" />
                                        <div className="space-y-2 text-center">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">200 Index</p>
                                            <p className="text-xs font-bold text-brand-orange">Autonomous</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {taskInputs.map((task) => {
                                        const taskTIS = Math.round(calculateTIS(task) * 200 * selection.adoptionRate);
                                        return (
                                            <div key={task.name} className="p-9 rounded-[2.5rem] border border-white/5 bg-white/[0.02] group relative overflow-hidden transition-all hover:border-white/10">
                                                <div className="flex justify-between items-center relative z-10">
                                                    <div className="space-y-3">
                                                        <div className="flex flex-col gap-2">
                                                            <p className="font-bold text-white text-xl tracking-tight leading-none">{task.name}</p>
                                                            {task.isCoreValue && <span className="text-[9px] bg-brand-orange text-white px-3 py-1 rounded-full font-black tracking-widest uppercase w-fit">Core Asset</span>}
                                                        </div>
                                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Intensity: {task.frequency}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="font-bold text-4xl text-white tracking-tighter">{taskTIS}</span>
                                                            <span className="text-[10px] font-black text-white/10 uppercase">/ 200</span>
                                                        </div>
                                                        <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                                                            <div className="h-full bg-brand-orange rounded-full transition-all duration-1000" style={{ width: `${(taskTIS / 200) * 100}%` }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="text-center pt-12">
                                    <button onClick={() => setShowBreakdown(false)} className="text-[11px] font-black uppercase text-white/20 hover:text-white transition-colors tracking-[0.4em] group flex items-center gap-3 mx-auto">
                                        <span className="inline-block transition-transform group-hover:-translate-y-1">↑</span> Close Diagnostics
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-6 pt-16">
                            <button
                                onClick={resetCalculator}
                                className="w-full py-10 bg-brand-orange text-white rounded-full font-bold text-4xl hover:scale-[1.02] shadow-[0_20px_60px_rgba(255,87,34,0.4)] transition-all active:scale-95 uppercase tracking-tight"
                            >
                                Analyze New Role
                            </button>

                            <div className="flex justify-center gap-12 items-center">
                                <button
                                    onClick={() => setStep('context')}
                                    className="text-white/30 font-bold text-[11px] uppercase tracking-[0.3em] hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <span>←</span> Edit Parameters
                                </button>
                                {!showBreakdown && (
                                    <button
                                        onClick={() => setShowBreakdown(true)}
                                        className="text-brand-orange font-bold text-[11px] uppercase tracking-[0.3em] hover:opacity-80 transition-opacity"
                                    >
                                        Detailed Breakdown node
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
            <div className="max-w-7xl mx-auto py-24 px-8">
                <div className="mb-24 space-y-10">
                    <div className="flex justify-end border-b border-white/5 pb-10">
                        <div className="flex items-center gap-10">
                            {step !== 'category' && (
                                <button
                                    onClick={() => {
                                        const prev = steps[currentStepIndex - 1];
                                        setStep(prev as Step);
                                    }}
                                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group flex items-center gap-2"
                                >
                                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
                                </button>
                            )}
                            <button
                                onClick={resetCalculator}
                                className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-brand-orange transition-colors flex items-center gap-2"
                            >
                                Home
                            </button>
                        </div>
                    </div>
                    <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-brand-orange transition-all duration-1000 ease-in-out shadow-[0_0_20px_rgba(255,87,34,0.4)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                {renderStep()}
            </div>
        </div>
    );
}
