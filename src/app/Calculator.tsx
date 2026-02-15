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
    <div className="space-y-4 animate-fade-in">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-cyan mb-4 underline decoration-neon-cyan/30 underline-offset-8">Risk Metrics</h3>
        <div className="grid grid-cols-1 gap-3">
            {RISK_BANDS.map((band) => (
                <div key={band.label} className="p-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm space-y-1 group hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all cursor-default">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: band.color, color: band.color }} />
                        <span className="text-[10px] font-bold text-white uppercase tracking-tight">{band.label}</span>
                    </div>
                    <div className="flex justify-between items-center text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">
                        <span>Index</span>
                        <span style={{ color: band.color }} className="drop-shadow-[0_0_5px_currentColor]">{band.min}-{band.max}</span>
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
                            <h2 className="text-5xl font-black tracking-tight text-white uppercase italic">Select Sector</h2>
                            <p className="text-white/40 font-medium text-lg leading-relaxed">Initialize analysis by defining your industrial environment.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {(rolesData as RoleCategory[]).map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setSelection({ ...selection, category: cat.name });
                                        setStep('role');
                                    }}
                                    className="p-10 text-left border-2 border-neon-cyan/20 rounded-3xl hover:border-neon-cyan hover:bg-neon-cyan/10 backdrop-blur-md transition-all duration-500 group relative overflow-hidden bg-black/40 shadow-[0_0_30px_rgba(0,243,255,0.05)] hover:shadow-[0_0_40px_rgba(0,243,255,0.2)]"
                                >
                                    <div className="flex justify-between items-center relative z-10">
                                        <div>
                                            <span className="text-3xl font-black text-white group-hover:text-neon-cyan transition-colors uppercase italic tracking-tighter drop-shadow-sm">{cat.name}</span>
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
                return (
                    <div className="space-y-10 animate-slide-up">
                        <h2 className="text-4xl font-black tracking-tight text-white uppercase italic text-center">Define Role</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(rolesData as RoleCategory[]).find(c => c.name === selection.category)?.roles.map(role => (
                                <button
                                    key={role}
                                    onClick={() => {
                                        setSelection({ ...selection, role });
                                        setStep('experience');
                                    }}
                                    className="p-10 text-center border-2 border-neon-pink/20 rounded-3xl hover:border-neon-pink hover:bg-neon-pink/10 backdrop-blur-md transition-all duration-300 group bg-black/40 shadow-[0_0_30px_rgba(255,0,255,0.05)] hover:shadow-[0_0_40px_rgba(255,0,255,0.2)]"
                                >
                                    <span className="text-xl font-black text-white/70 group-hover:text-neon-pink transition-colors uppercase tracking-tight leading-none">{role}</span>
                                    <div className="h-1 bg-neon-pink/10 w-1/3 mx-auto mt-4 group-hover:bg-neon-pink/50 transition-colors rounded-full" />
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
                                        setSelection({ ...selection, experience: level as keyof typeof SCORING_CONSTANTS.EXPERIENCE_MODIFIERS });
                                        setStep('frequency');
                                    }}
                                    className={`p-12 border-4 rounded-[2.5rem] backdrop-blur-md transition-all duration-500 group bg-black/40 flex flex-col items-center gap-4 ${selection.experience === level ? 'border-neon-green bg-neon-green text-black shadow-[0_0_50px_rgba(57,255,20,0.6)] scale-[1.05]' : 'border-white/10 hover:border-neon-green/50 hover:bg-neon-green/5 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]'}`}
                                >
                                    <span className={`text-5xl font-black transition-all uppercase tracking-tighter italic ${selection.experience === level ? 'text-black' : 'text-white/40 group-hover:text-neon-green'}`}>{level}</span>
                                    <p className={`text-[10px] font-black tracking-[0.2em] uppercase transition-all ${selection.experience === level ? 'text-black/60' : 'text-white/20 group-hover:text-white/40'}`}>Modifier: {SCORING_CONSTANTS.EXPERIENCE_MODIFIERS[level as keyof typeof SCORING_CONSTANTS.EXPERIENCE_MODIFIERS]}x</p>
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
                                                    frequencies: { ...selection.frequencies, [task]: freq as keyof typeof SCORING_CONSTANTS.FREQUENCY_WEIGHTS }
                                                })}
                                                className={`flex-1 py-5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all duration-500 border-2 ${selection.frequencies[task] === freq
                                                    ? 'bg-neon-green text-black border-neon-green shadow-[0_0_30px_rgba(57,255,20,0.5)] scale-[1.05]'
                                                    : 'text-neon-green/40 border-neon-green/10 hover:text-neon-green hover:border-neon-green/30 hover:bg-neon-green/5'
                                                    }`}
                                            >
                                                {freq}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="sticky bottom-8 py-8 px-6 glass rounded-[3rem] shadow-2xl flex gap-4 border-2 border-neon-cyan/30">
                            <button
                                disabled={Object.keys(selection.frequencies).length < currentRoleTasks.length}
                                onClick={() => setStep('value-add')}
                                className="flex-1 py-8 bg-neon-green text-black rounded-[2rem] font-black text-3xl disabled:opacity-20 transition-all hover:bg-white hover:shadow-[0_0_60px_rgba(57,255,20,0.8)] uppercase italic tracking-tighter"
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
                            <p className="text-white/40 font-medium max-w-2xl mx-auto">Which tasks rely on your unique human judgment, empathy, or complex creativity? Select these to weight them as &quot;Protected Assets&quot; for a more accurate analysis.</p>
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
                                    className={`p-8 text-left border-3 rounded-3xl transition-all duration-500 flex justify-between items-center group relative overflow-hidden backdrop-blur-xl ${selection.coreTasks.includes(task)
                                        ? 'bg-neon-pink/20 border-neon-pink shadow-[0_0_40px_rgba(255,0,255,0.3)] scale-[1.02]'
                                        : 'bg-black/40 border-white/10 hover:border-neon-pink/50 hover:bg-neon-pink/5 hover:shadow-[0_0_30px_rgba(255,0,255,0.1)]'
                                        }`}
                                >
                                    <div className="relative z-10 flex items-center gap-6">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${selection.coreTasks.includes(task) ? 'bg-neon-pink border-neon-pink text-black' : 'border-white/10 text-white/20 group-hover:border-neon-pink/50'}`}>
                                            {selection.coreTasks.includes(task) ? '✓' : ''}
                                        </div>
                                        <span className={`text-xl font-black uppercase tracking-tight italic transition-all ${selection.coreTasks.includes(task) ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>{task}</span>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full border-2 transition-all ${selection.coreTasks.includes(task) ? 'border-neon-pink text-neon-pink bg-black/20' : 'border-white/10 text-white/10 group-hover:text-white/30'}`}>Asset</span>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setStep('context')}
                            className="w-full py-10 text-black bg-neon-cyan font-black text-2xl uppercase tracking-[0.3em] rounded-[2.5rem] mt-8 hover:bg-white hover:shadow-[0_0_50px_rgba(0,243,255,0.8)] transition-all italic"
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
                        <div className="grid grid-cols-1 gap-6">
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
                                    className="p-12 text-left border-4 border-white/10 rounded-[3rem] hover:border-neon-green hover:bg-neon-green/10 transition-all duration-500 bg-black/40 group relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                                >
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="space-y-2">
                                            <span className="text-4xl font-black text-white group-hover:text-neon-green transition-colors uppercase italic tracking-tighter drop-shadow-md">{item.label}</span>
                                            <p className="text-white/30 font-bold uppercase text-xs tracking-[0.4em] group-hover:text-white/60 transition-colors font-mono">{item.desc}</p>
                                        </div>
                                        <div className="w-16 h-16 rounded-2xl border-2 border-white/10 flex items-center justify-center group-hover:bg-neon-green group-hover:border-neon-green transition-all duration-500">
                                            <span className="text-white group-hover:text-black font-black text-2xl transition-colors">→</span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-neon-green/5 blur-[50px] rounded-full group-hover:bg-neon-green/20 transition-all duration-700" />
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
                        <div className="lg:grid lg:grid-cols-12 lg:gap-12 space-y-12 lg:space-y-0">
                            {/* Dashboard Left: Score & Identity */}
                            <div className="lg:col-span-4 space-y-8 text-center lg:text-left flex flex-col justify-center">
                                <span className="inline-block px-6 py-2 bg-neon-green/10 border-2 border-neon-green/30 rounded-full text-[9px] font-black uppercase tracking-[0.5em] text-neon-green shadow-[0_0_20px_rgba(57,255,20,0.2)] mb-4 w-fit mx-auto lg:mx-0">Saturation Index</span>
                                <h1 className="text-5xl font-black tracking-tighter text-white/20 uppercase italic leading-none">AI Exposure</h1>
                                <div className="text-[10rem] leading-none font-black tracking-tighter transition-all duration-700 hover:scale-105 select-none text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                                    {score}
                                </div>
                            </div>

                            {/* Dashboard Center: Impact Card & Secondary Stats */}
                            <div className="lg:col-span-5 space-y-6">
                                <div className="p-12 rounded-[3.5rem] border-2 border-neon-cyan bg-black/60 backdrop-blur-2xl relative overflow-hidden group shadow-[0_0_60px_rgba(0,243,255,0.4)]">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-green" />
                                    <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-4" style={{ color: band.color }}>{band.label}</h2>
                                    <p className="text-xl font-medium text-white/80 leading-relaxed italic drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                        &ldquo;{band.description}&rdquo;
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div
                                        onClick={() => setShowIntegrityDetails(!showIntegrityDetails)}
                                        className={`p-10 rounded-[3rem] border-2 transition-all cursor-pointer group backdrop-blur-md shadow-lg ${showIntegrityDetails ? 'bg-neon-cyan/20 border-neon-cyan shadow-[0_0_40px_rgba(0,243,255,0.2)]' : 'border-white/10 bg-black/40 hover:border-neon-cyan/50 hover:bg-black/60 shadow-[0_0_30px_rgba(0,243,255,0.05)]'}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-3">
                                                <h3 className={`font-black text-xl uppercase tracking-tight italic transition-colors ${showIntegrityDetails ? 'text-neon-cyan' : 'text-white'}`}>Integrity Vector</h3>
                                                <p className="text-white/40 leading-relaxed font-bold uppercase text-[10px] tracking-widest">
                                                    Analysis of <strong className="text-neon-cyan">{selection.role}</strong> and <strong className="text-neon-pink">{selection.adoptionRate}x</strong> adoption.
                                                </p>
                                            </div>
                                            <span className={`text-2xl transition-transform ${showIntegrityDetails ? 'rotate-180 text-neon-cyan' : 'text-white/20'} font-bold`}>↓</span>
                                        </div>
                                        {showIntegrityDetails && (
                                            <div className="mt-8 pt-8 border-t border-neon-cyan/20 animate-fade-in space-y-6">
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Scoring Logic</p>
                                                        <p className="text-[11px] font-bold text-white/90">Composite weighting of structural tasks + human value modifiers.</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Market Context</p>
                                                        <p className="text-[11px] font-bold text-white/90">Reflecting current maturity of Transformer-based automation models.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        onClick={() => setShowBreakdown(!showBreakdown)}
                                        className={`p-10 rounded-[3rem] border-2 transition-all cursor-pointer group backdrop-blur-md shadow-lg ${showBreakdown ? 'bg-neon-pink/20 border-neon-pink shadow-[0_0_40px_rgba(255,0,255,0.2)]' : 'border-white/10 bg-black/40 hover:border-neon-pink/50 hover:bg-black/60 shadow-[0_0_30px_rgba(255,0,255,0.05)]'}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-3">
                                                <h3 className={`font-black text-xl uppercase tracking-tight italic transition-colors ${showBreakdown ? 'text-neon-pink' : 'text-neon-pink/70'}`}>Diagnostic Graph</h3>
                                                <p className="text-white/40 leading-relaxed font-bold uppercase text-[10px] tracking-widest">
                                                    Reflecting <strong>{selection.coreTasks.length}</strong> core human-advantage nodes.
                                                </p>
                                            </div>
                                            <span className={`text-2xl transition-transform ${showBreakdown ? 'rotate-180 text-neon-pink' : 'text-white/20'} font-bold`}>↓</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Right: Metric Legend */}
                            <div className="lg:col-span-3 lg:border-l lg:border-white/5 lg:pl-12">
                                <ScoreLegend />
                            </div>
                        </div>

                        {showBreakdown && (
                            <div className="mt-12 pt-12 border-t border-white/5 text-left animate-slide-up max-w-5xl mx-auto space-y-12">
                                <div className="flex flex-col md:flex-row justify-between items-center bg-black/60 p-10 rounded-[2.5rem] border-2 border-neon-cyan/20 gap-8 shadow-[0_0_40px_rgba(0,243,255,0.1)]">
                                    <div className="space-y-2">
                                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Variance Matrix</h2>
                                        <p className="text-white/40 uppercase font-black text-[10px] tracking-widest font-mono">Impact Score (TIS) Diagnostic</p>
                                    </div>
                                    <div className="flex bg-black p-5 rounded-2xl border-2 border-white/10 gap-8">
                                        <div className="space-y-1 text-center">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">0 Index</p>
                                            <p className="text-xs font-black text-white uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">PURE HUMAN</p>
                                        </div>
                                        <div className="w-px h-8 bg-white/10" />
                                        <div className="space-y-1 text-center">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">200 Index</p>
                                            <p className="text-xs font-black text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">AUTONOMOUS AI</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {taskInputs.map((task) => {
                                        const taskTIS = Math.round(calculateTIS(task) * 200 * selection.adoptionRate);
                                        return (
                                            <div key={task.name} className="p-8 rounded-3xl border-2 border-white/5 bg-black/60 group relative overflow-hidden transition-all hover:border-neon-cyan/30 hover:bg-neon-cyan/5 shadow-md">
                                                <div className="absolute top-0 left-0 w-2 h-full bg-neon-cyan/10 group-hover:bg-neon-cyan transition-all duration-500 shadow-[0_0_15px_currentColor]" />
                                                <div className="flex justify-between items-center relative z-10">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <p className="font-black text-white text-xl uppercase tracking-tighter italic leading-none">{task.name}</p>
                                                            {task.isCoreValue && <span className="text-[9px] bg-neon-pink text-black px-4 py-1.5 rounded-full font-black tracking-widest uppercase shadow-[0_0_12px_rgba(255,0,255,0.4)]">Core Asset</span>}
                                                        </div>
                                                        <p className="text-[10px] font-black text-neon-cyan/40 uppercase tracking-[0.4em] font-mono">Intensity: {task.frequency}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="font-black text-4xl text-white italic tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{taskTIS}</span>
                                                            <span className="text-xs font-black text-white/20 uppercase">/ 200</span>
                                                        </div>
                                                        <div className="w-28 h-2 bg-white/5 rounded-full overflow-hidden mt-3 p-[1px] border border-white/10">
                                                            <div className="h-full bg-neon-cyan rounded-full shadow-[0_0_15px_rgba(0,243,255,0.8)] transition-all duration-1000" style={{ width: `${(taskTIS / 200) * 100}%` }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="text-center pt-8">
                                    <button onClick={() => setShowBreakdown(false)} className="text-[10px] font-black uppercase text-white/30 hover:text-blue-500 transition-colors tracking-[0.3em] group">
                                        <span className="inline-block transition-transform group-hover:-translate-y-1">↑</span> Close Diagnostics
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-6 pt-10">
                            <button
                                onClick={resetCalculator}
                                className="w-full py-10 bg-neon-cyan text-black rounded-[3rem] font-black text-4xl hover:bg-white hover:shadow-[0_0_50px_rgba(0,243,255,0.8)] transition-all active:scale-95 uppercase italic tracking-tighter"
                            >
                                Analyze New Role
                            </button>

                            <div className="flex justify-center gap-10 items-center">
                                <button
                                    onClick={() => setStep('context')}
                                    className="text-neon-cyan/60 font-black text-xs uppercase tracking-[0.3em] hover:text-neon-cyan transition-colors flex items-center gap-2"
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
            <div className="max-w-7xl mx-auto py-24 px-8">
                <div className="mb-24 space-y-8">
                    <div className="flex justify-between items-end">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.4)]">Core Architecture v2.0 // NEON</span>
                            <div className="text-5xl font-black text-white/10 italic uppercase tracking-tighter leading-none">
                                {step === 'results' ? 'Success' : `Phase 0${currentStepIndex + 1}`}
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            {step !== 'category' && (
                                <button
                                    onClick={() => {
                                        const prev = steps[currentStepIndex - 1];
                                        setStep(prev as Step);
                                    }}
                                    className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors group flex items-center gap-2"
                                >
                                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
                                </button>
                            )}
                            <button
                                onClick={resetCalculator}
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-neon-green transition-colors flex items-center gap-2"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </button>
                        </div>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                        <div
                            className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full transition-all duration-1000 ease-in-out shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                {renderStep()}
            </div>
        </div>
    );
}
