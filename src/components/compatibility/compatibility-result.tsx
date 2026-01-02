'use client';

import React from 'react';
import { ShareableCompatibilityCard } from '../social/ShareableCompatibilityCard'; // Import the new card
import { X, Lock } from 'lucide-react';
import type { CompatibilityResult as ResultType } from '../../utils/compatibility_types';

interface CompatibilityResultProps {
    result: ResultType;
    names: { nameA: string; nameB: string };
    onReset: () => void;
    isLocked?: boolean;
    onUnlock?: () => void;
    userTier?: 'FREE' | 'BASIC' | 'INFINITY';
    checksUsed?: number;
    onIncrementChecks?: () => void;
}

export const CompatibilityResult: React.FC<CompatibilityResultProps> = ({
    result,
    names,
    onReset,
    isLocked = false,
    onUnlock,
    userTier = 'FREE',
    checksUsed = 0,
    onIncrementChecks
}) => {
    const { compatibility, personA, personB } = result;
    const nameA = names.nameA || 'Person A';
    const nameB = names.nameB || 'Person B';
    const [showShareModal, setShowShareModal] = React.useState(false);
    const [showDeepDive, setShowDeepDive] = React.useState(false);

    // Track if this specific report has been 'counted' as used
    const [isRevealed, setIsRevealed] = React.useState(userTier === 'INFINITY');

    // Effect to auto-reveal if user is Infinity or if it's already counted in this session
    React.useEffect(() => {
        if (userTier === 'INFINITY') setIsRevealed(true);
    }, [userTier]);

    // Unified Lock Logic: A section is locked if:
    // 1. User is FREE
    // 2. User is BASIC but hasn't revealed this report yet AND has 0 checks left
    // 3. User is BASIC but hasn't clicked 'Reveal' yet.

    const actualLocked = !isRevealed && userTier !== 'INFINITY';

    const handleRevealAnalysis = () => {
        if (userTier === 'INFINITY') {
            setIsRevealed(true);
            setShowDeepDive(true);
            return;
        }

        if (userTier === 'BASIC') {
            if (checksUsed < 2) {
                // If not already revealed, count it
                if (!isRevealed) {
                    onIncrementChecks?.();
                    setIsRevealed(true);
                }
                setShowDeepDive(true);
            } else {
                // Out of checks, show paywall
                onUnlock?.();
            }
            return;
        }

        // FREE user
        onUnlock?.();
    };

    // Premium Lock Overlay Component
    const PremiumLockOverlay = ({ title }: { title: string }) => (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center rounded-3xl border border-white/5 shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 bg-gold/5 border border-gold/20 rounded-full flex items-center justify-center mb-6 relative group">
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                <Lock className="text-gold relative z-10" size={24} />
            </div>
            <h4 className="text-2xl font-serif text-white mb-2">{title} locked</h4>
            <p className="text-white/40 text-sm max-w-xs mb-8 italic">
                {userTier === 'BASIC' && checksUsed >= 2
                    ? "You've used your 2 reveals. Upgrade to Infinity for unlimited access to all soul layers."
                    : "Get the Infinity Pass to decrypt this soul layer and unlimited deep analysis."}
            </p>
            <div className="mb-8">
                <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-serif text-white">$22</span>
                    <span className="text-white/20 line-through text-lg">$66</span>
                </div>
                <span className="text-gold/60 text-[10px] uppercase tracking-[0.2em] font-bold block mt-1">Limited Time Offer</span>
            </div>
            <button
                onClick={onUnlock}
                className="px-10 py-4 bg-gradient-to-r from-gold via-yellow-500 to-yellow-700 text-black font-bold uppercase tracking-widest text-[10px] rounded-xl hover:scale-105 transition-all shadow-xl shadow-gold/20 active:scale-95"
            >
                Activate Infinity Pass
            </button>
        </div>
    );

    const CompactLockOverlay = ({ label }: { label: string }) => (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-[2px] rounded-xl border border-white/5 p-4 text-center group">
            <Lock className="text-gold/50 mb-2 group-hover:scale-110 transition-transform" size={14} />
            <span className="text-[9px] font-bold text-white/50 uppercase tracking-[0.2em] mb-3">{label} Locked</span>
            <button
                onClick={handleRevealAnalysis}
                className="text-[9px] border border-gold/30 hover:bg-gold hover:text-black text-gold px-4 py-1.5 rounded-full uppercase tracking-widest transition-all font-bold"
            >
                {userTier === 'BASIC' && !isRevealed ? 'Use Reveal' : 'Decrypt'}
            </button>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-20 relative">

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
                    <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl no-scrollbar">
                        <button
                            onClick={() => setShowShareModal(false)}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-serif text-white">Your Compatibility Report</h3>
                                <p className="text-white/50 text-sm mt-1">
                                    The truth about your connection.
                                </p>
                            </div>

                            <ShareableCompatibilityCard result={result} names={names} />
                        </div>
                    </div>
                </div>
            )}

            {/* HEADER SECTION: Identity & Vibe */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {result.scores.label} • {result.scores.vibe}
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    {nameA} <span className="text-white/30">&</span> {nameB}
                </h2>
                <div className="flex justify-center items-center gap-6 text-sm text-purple-300 uppercase tracking-widest">
                    <span>LP {personA.lifePath}</span>
                    <span>LP {personB.lifePath}</span>
                </div>
            </div>

            {/* SECTION 1: CORE MATCH HERO */}
            <div className="relative px-8 pb-8 pt-24 bg-gradient-to-b from-purple-900/40 to-black/40 backdrop-blur-md rounded-3xl border border-purple-500/20 text-center overflow-hidden group">
                {/* Share Button (Top Right of Card) */}
                <div className="absolute right-4 top-4 z-20">
                    <button
                        onClick={() => setShowShareModal(true)}
                        className="text-[10px] text-gold uppercase tracking-widest border border-gold/20 px-3 py-1.5 rounded-full hover:bg-gold/10 transition-colors bg-black/20 backdrop-blur-md"
                    >
                        Get Compatibility Card
                    </button>
                </div>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

                <div className="mb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent mb-4">
                        {compatibility.core.title}
                    </h1>

                    {/* Circular Match Score & Granular Metrics (Restored) */}
                    {result.scores && (
                        <div className="flex flex-col items-center justify-center mb-8">
                            {/* Circular Progress */}
                            <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="72"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        className="text-white/5"
                                    />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="72"
                                        fill="none"
                                        stroke="url(#hero-gradient)"
                                        strokeWidth="8"
                                        strokeDasharray={2 * Math.PI * 72}
                                        strokeDashoffset={2 * Math.PI * 72 * (1 - result.scores.total / 100)}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out"
                                    />
                                    <defs>
                                        <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#c084fc" />
                                            <stop offset="100%" stopColor="#f472b6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in-up">
                                    <span className="text-5xl font-bold text-white font-mono tracking-tighter shadow-lg">{result.scores.total}%</span>
                                    <span className="text-xs text-center uppercase tracking-[0.2em] text-purple-300 mt-1">Match<br />Chance</span>
                                </div>
                            </div>

                            {/* Granular Metrics Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-3xl">
                                {[
                                    { label: 'Emotional', val: result.scores.emotional, color: 'bg-pink-500', icon: '❤️' },
                                    { label: 'Mental', val: result.scores.mental, color: 'bg-blue-500', icon: '🧠' },
                                    { label: 'Physical', val: result.scores.physical, color: 'bg-emerald-500', icon: '⚡' },
                                    { label: 'Soul', val: result.scores.soul, color: 'bg-purple-500', icon: '✨' }
                                ].map((stat) => (
                                    <div key={stat.label} className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col justify-between hover:bg-white/10 transition-colors group">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
                                            <span className="text-xs grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100">{stat.icon}</span>
                                        </div>
                                        <div className="flex items-end gap-2 mb-2">
                                            <span className="text-xl font-bold text-white">{stat.val}%</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${stat.color} transition-all duration-1000`}
                                                style={{ width: `${stat.val}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-8 mt-4 font-serif italic text-white/80">
                        &quot;{compatibility.core.dynamic}&quot;
                    </p>
                </div>
            </div>

            {/* SECTION 2: THE 3 LAYERS OF CONNECTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">

                {/* Layer 1: The Surface (Attitude) */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-4xl">🎭</span>
                    </div>
                    <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">Layer 1: The Surface</h3>
                    <h4 className="text-white font-serif text-lg mb-4">First Impressions</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {result.attitude?.text || "Your outer personalities interact in a unique way."}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-white/40">
                        <span>Attitude Sync</span>
                        <span className="text-emerald-400 font-bold">{result.attitude?.score || 65}%</span>
                    </div>
                </div>

                {/* Layer 2: The Friction (Birth Day) */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-4xl">⚙️</span>
                    </div>
                    <h3 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Layer 2: The Friction</h3>
                    <h4 className="text-white font-serif text-lg mb-4">Daily Mechanics</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {result.synergy?.text || "Your daily habits and reactions create a specific rhythm."}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-white/40">
                        <span>Daily Synergy</span>
                        <span className="text-blue-400 font-bold">{result.synergy?.score || 50}%</span>
                    </div>
                </div>

                {/* Layer 3: The Soul (Life Path) */}
                <div className="bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                    {actualLocked && <CompactLockOverlay label="Soul Layer" />}

                    {/* Check Count for BASIC */}
                    {userTier === 'BASIC' && !isRevealed && checksUsed < 2 && (
                        <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-blue-500/20 rounded-full border border-blue-500/30 text-[8px] uppercase tracking-widest text-blue-300 font-bold">
                            {2 - checksUsed} Reveal{2 - checksUsed > 1 ? 's' : ''} Left
                        </div>
                    )}

                    <div className={actualLocked ? "blur-sm opacity-50" : ""}>
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-4xl">🔮</span>
                        </div>
                        <h3 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">Layer 3: The Soul</h3>
                        <h4 className="text-white font-serif text-lg mb-4">{compatibility.core.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                            {compatibility.core.dynamic}
                        </p>
                    </div>
                </div>
            </div>

            {/* SECTION: REALITY CHECK / VIRAL DIAGNOSTICS */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none" />

                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 relative z-10">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">The Reality Check</span>
                    <span className="text-xs font-normal text-white/40 border border-white/10 px-2 py-1 rounded-full uppercase tracking-widest">Viral Diagnostics</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">

                    {/* Left Col: The Metrics (Lust, Logic, Toxic) */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-bold text-red-400 uppercase tracking-widest">Lust</span>
                                <span className="text-xl font-bold text-white">{result.viralBreakdown?.lust || 0}%</span>
                            </div>
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-1000" style={{ width: `${result.viralBreakdown?.lust || 0}%` }} />
                            </div>
                            <p className="text-xs text-white/40">Physical chemistry and raw attraction.</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">Logic</span>
                                <span className="text-xl font-bold text-white">{result.viralBreakdown?.logic || 0}%</span>
                            </div>
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all duration-1000" style={{ width: `${result.viralBreakdown?.logic || 0}%` }} />
                            </div>
                            <p className="text-xs text-white/40">Communication and practical alignment.</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-bold text-green-400 uppercase tracking-widest">Toxic</span>
                                <span className="text-xl font-bold text-white">{result.viralBreakdown?.toxic || 0}%</span>
                            </div>
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-gradient-to-r from-green-600 to-emerald-400 shadow-[0_0_15px_rgba(22,163,74,0.5)] transition-all duration-1000" style={{ width: `${result.viralBreakdown?.toxic || 0}%` }} />
                            </div>
                            <p className="text-xs text-white/40">Intensity, friction, and volatility.</p>
                        </div>
                    </div>

                    {/* Right Col: The Insights (Receipt Items reimagined) */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Detected Patterns</h4>

                        {compatibility.viral?.receipt && (
                            <div className="space-y-3">
                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center group hover:bg-white/10 transition-colors">
                                    <span className="text-gray-300 text-sm font-medium">{compatibility.viral.receipt.item1.label}</span>
                                    <span className="text-white font-bold text-sm bg-black/40 px-3 py-1 rounded-lg border border-white/5 shadow-inner">{compatibility.viral.receipt.item1.value}</span>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center group hover:bg-white/10 transition-colors">
                                    <span className="text-gray-300 text-sm font-medium">{compatibility.viral.receipt.item2.label}</span>
                                    <span className="text-white font-bold text-sm bg-black/40 px-3 py-1 rounded-lg border border-white/5 shadow-inner">{compatibility.viral.receipt.item2.value}</span>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center group hover:bg-white/10 transition-colors">
                                    <span className="text-gray-300 text-sm font-medium">{compatibility.viral.receipt.item3.label}</span>
                                    <span className="text-white font-bold text-sm bg-black/40 px-3 py-1 rounded-lg border border-white/5 shadow-inner">{compatibility.viral.receipt.item3.value}</span>
                                </div>
                            </div>
                        )}

                        {/* Survival Prob / Insight */}
                        <div className="mt-6 pt-6 border-t border-white/10 relative">
                            {actualLocked && <CompactLockOverlay label="Verdict" />}
                            <div className={actualLocked ? "blur-sm opacity-30 select-none" : ""}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-white/50 uppercase tracking-widest">System Verdict</span>
                                </div>
                                <p className="text-white font-serif italic text-lg leading-relaxed">
                                    &quot;{result.viralBreakdown?.insight || "Calculations complete. Proceed with caution."}&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Roast & Flags (Integrated below) */}
                {compatibility.viral && (
                    <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 gap-8 relative z-10">
                        {/* Roast */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
                                <span>🔥</span> The Dark Mirror
                            </h4>
                            <div className="p-6 bg-gradient-to-br from-red-900/20 to-black rounded-xl border border-red-500/10">
                                <p className="text-lg text-red-200/90 font-serif italic leading-relaxed">
                                    &quot;{compatibility.viral.roast}&quot;
                                </p>
                            </div>
                        </div>

                        {/* Breakup Analysis (The "Scary" Part) */}
                        {result.breakupPrediction && (
                            <div className="space-y-6">
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                                        <span>💔</span> Breakup Analysis
                                    </h4>
                                    <div className="text-[10px] text-white/40 uppercase tracking-widest">
                                        Cosmic Probability Calculation
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/40 to-black border border-red-500/20 backdrop-blur-md relative overflow-hidden group">

                                    {/* Background Pulse */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-red-600/20 transition-all duration-700"></div>

                                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">

                                        {/* The Score */}
                                        <div className="flex flex-col items-center justify-center min-w-[140px]">
                                            <div className="text-[4rem] md:text-[5rem] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-900 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                                                {result.breakupPrediction.chance}%
                                            </div>
                                            <div className="mt-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-950/50 text-[10px] uppercase tracking-widest font-bold text-red-400 shadow-[0_0_10px_rgba(220,38,38,0.2)]">
                                                {result.breakupPrediction.riskLevel} Risk
                                            </div>
                                            <div className="text-[10px] text-red-300/50 mt-1 uppercase tracking-wide">
                                                Probability of Split
                                            </div>
                                        </div>

                                        {/* The Insights */}
                                        <div className="flex-1 space-y-4 w-full relative">
                                            {actualLocked && <CompactLockOverlay label="Breakup Reasons" />}
                                            <div className={actualLocked ? "blur-sm opacity-30 select-none space-y-3" : "space-y-3"}>
                                                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 border-b border-white/5 pb-2">
                                                    Fatal Flaws Detected
                                                </h5>
                                                {result.breakupPrediction.insights.map((insight, i) => (
                                                    <div key={i} className="flex gap-3 items-start animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                                                        <span className="text-red-500 mt-1 text-xs">⚠️</span>
                                                        <p className="text-sm text-gray-300 leading-relaxed font-medium">
                                                            {insight}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* DEEP DIVE BUTTON */}
            {!showDeepDive && (
                <div className="flex justify-center my-8 animate-pulse-slow">
                    <button
                        onClick={handleRevealAnalysis}
                        className="group relative px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10 shadow-xl hover:scale-105"
                    >
                        <span className="absolute inset-0 rounded-full border border-white/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity"></span>
                        <span className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
                            Reveal Full Analysis <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
                        </span>
                    </button>
                </div>
            )
            }

            {/* COLLAPSIBLE DEEP DIVE */}
            {showDeepDive && (
                <div className="space-y-12 animate-fade-in-up">

                    {/* 1. Core Dynamics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {actualLocked && <PremiumLockOverlay title="Unlock Core Dynamics" />}

                        <div className={`p-5 bg-white/5 rounded-2xl border border-white/5 ${actualLocked ? 'blur-sm opacity-30' : ''}`}>
                            <h4 className="text-pink-400 text-xs font-bold uppercase tracking-wider mb-2">The Gift</h4>
                            <p className="text-gray-300 text-sm">{compatibility.core.gift}</p>
                        </div>
                        <div className={`p-5 bg-white/5 rounded-2xl border border-white/5 ${actualLocked ? 'blur-sm opacity-30' : ''}`}>
                            <h4 className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">The Challenge</h4>
                            <p className="text-gray-300 text-sm">{compatibility.core.challenge}</p>
                        </div>
                        <div className={`p-5 bg-white/5 rounded-2xl border border-white/5 ${actualLocked ? 'blur-sm opacity-30' : ''}`}>
                            <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">The Growth</h4>
                            <p className="text-gray-300 text-sm">{compatibility.core.growth}</p>
                        </div>
                    </div>

                    {/* 2. Interaction & Truth */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                        {actualLocked && <div className="absolute inset-0 z-20"><PremiumLockOverlay title="Unlock Relationship Mechanics" /></div>}

                        <div className={`space-y-4 ${actualLocked ? 'blur-sm opacity-30' : ''}`}>
                            <h3 className="text-xl font-bold text-white flex items-center">
                                <span className="mr-2 text-gold">⚡</span> How You Interact
                            </h3>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <p className="text-gray-300 mb-4 leading-relaxed">
                                    {compatibility.interaction.description}
                                </p>
                                <div className="p-4 bg-black/20 rounded-xl border-l-2 border-gold/50">
                                    <span className="text-gold/80 font-bold block text-[10px] mb-1 uppercase tracking-widest">The Work</span>
                                    <p className="text-gray-400 text-sm italic">{compatibility.interaction.work}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`space-y-4 ${actualLocked ? 'blur-sm opacity-30' : ''}`}>
                            <h3 className="text-xl font-bold text-white flex items-center">
                                <span className="mr-2 text-gold">👁️</span> The Truth
                            </h3>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <p className="text-gray-300 mb-4 leading-relaxed">
                                    {compatibility.truth.description}
                                </p>
                                <div className="p-4 bg-black/20 rounded-xl border-l-2 border-red-500/50">
                                    <span className="text-red-400/80 font-bold block text-[10px] mb-1 uppercase tracking-widest">The Insight</span>
                                    <p className="text-gray-400 text-sm italic">{compatibility.truth.insight}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Psychological Map (If available) */}
                    {compatibility.deep && (
                        <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8">
                            {actualLocked && <PremiumLockOverlay title="Unlock Psychological Map" />}

                            <div className={actualLocked ? 'blur-sm opacity-30 pointer-events-none' : ''}>
                                <h3 className="text-2xl font-serif text-center text-white mb-8">Psychological Map</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h4 className="text-white/40 text-[10px] uppercase mb-4 tracking-widest border-b border-white/10 pb-2">Communication Styles</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-gold text-xs font-bold block mb-1">{nameA}</span>
                                                <p className="text-sm text-gray-300">&quot;{compatibility.deep.communication.personA}&quot;</p>
                                            </div>
                                            <div>
                                                <span className="text-gold text-xs font-bold block mb-1">{nameB}</span>
                                                <p className="text-sm text-gray-300">&quot;{compatibility.deep.communication.personB}&quot;</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-white/40 text-[10px] uppercase mb-4 tracking-widest border-b border-white/10 pb-2">Intimacy & Triggers</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-red-400 text-xs font-bold block mb-1">Triggers</span>
                                                <p className="text-sm text-gray-300">{compatibility.deep.triggers}</p>
                                            </div>
                                            <div>
                                                <span className="text-pink-400 text-xs font-bold block mb-1">Intimacy</span>
                                                <p className="text-sm text-gray-300">{compatibility.deep.intimacy}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-black/20 rounded-xl p-6 text-center border border-white/5">
                                    <h4 className="text-purple-400 text-[10px] uppercase tracking-widest mb-2">Long Term Trajectory</h4>
                                    <p className="text-lg text-white font-serif italic">&quot;{compatibility.deep.trajectory}&quot;</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4. THE CONFLICT PROTOCOL (New Feature) */}
                    {result.conflict_matrix && (
                        <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-b from-red-950/20 to-black p-8 group">
                            {actualLocked && <PremiumLockOverlay title="Unlock Conflict Matrix" />}

                            <div className={actualLocked ? 'blur-sm opacity-30 pointer-events-none' : ''}>
                                {/* Header */}
                                <div className="flex flex-col items-center mb-8">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                        <span className="text-[10px] uppercase tracking-widest text-red-400 font-bold">Fight Matrix</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-serif text-white text-center">
                                        {result.conflict_matrix.style}
                                    </h3>
                                    <p className="text-white/40 text-xs uppercase tracking-widest mt-2">
                                        Intensity Level: <span className="text-red-400 font-bold">{result.conflict_matrix.intensity}</span>
                                    </p>
                                </div>

                                {/* VS GRID */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                                    {/* Instigator A */}
                                    <div className={`text-center space-y-2 p-4 rounded-xl border border-white/5 bg-white/5 transition-all duration-500 ${result.conflict_matrix.instigator === 'A' ? 'shadow-[0_0_20px_rgba(220,38,38,0.2)] border-red-500/30' : 'opacity-60'}`}>
                                        <div className="text-xs uppercase tracking-widest text-white/50 mb-1">
                                            {result.conflict_matrix.instigator === 'A' ? 'The Instigator' : 'The Reactor'}
                                        </div>
                                        <div className="text-xl font-bold text-white font-serif">{nameA}</div>
                                        <div className="text-red-300 text-xs italic">
                                            &quot;{result.conflict_matrix.personA_weapon}&quot;
                                        </div>
                                    </div>

                                    {/* VS Badge */}
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="text-4xl font-black text-white/10 italic">VS</div>
                                    </div>

                                    {/* Instigator B */}
                                    <div className={`text-center space-y-2 p-4 rounded-xl border border-white/5 bg-white/5 transition-all duration-500 ${result.conflict_matrix.instigator === 'B' ? 'shadow-[0_0_20px_rgba(220,38,38,0.2)] border-red-500/30' : 'opacity-60'}`}>
                                        <div className="text-xs uppercase tracking-widest text-white/50 mb-1">
                                            {result.conflict_matrix.instigator === 'B' ? 'The Instigator' : 'The Reactor'}
                                        </div>
                                        <div className="text-xl font-bold text-white font-serif">{nameB}</div>
                                        <div className="text-red-300 text-xs italic">
                                            &quot;{result.conflict_matrix.personB_weapon}&quot;
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Stats */}
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-red-900/10 border border-red-500/10 rounded-xl">
                                        <span className="block text-[10px] uppercase tracking-widest text-red-400/70 mb-1">How it ends</span>
                                        <span className="text-sm text-gray-300">{result.conflict_matrix.likely_resolution}</span>
                                    </div>
                                    <div className="p-4 bg-red-900/10 border border-red-500/10 rounded-xl">
                                        <span className="block text-[10px] uppercase tracking-widest text-red-400/70 mb-1">Recovery Time</span>
                                        <span className="text-sm text-gray-300">{result.conflict_matrix.aftermath_timeline}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 5. Timing & Soul Contract */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                        {actualLocked && <PremiumLockOverlay title="Unlock Soul Contract" />}

                        <div className={`p-6 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl border border-indigo-500/10 ${actualLocked ? 'blur-sm opacity-30' : ''}`}>
                            <h4 className="text-indigo-300 font-bold uppercase tracking-wider text-xs mb-3">Soul Contract</h4>
                            <p className="text-xl text-white font-light italic leading-relaxed">
                                &quot;{compatibility.soulParams.teaching}&quot;
                            </p>
                        </div>

                        {result.timing && (
                            <div className={`p-6 bg-white/5 rounded-2xl border border-white/10 ${actualLocked ? 'blur-sm opacity-30' : ''}`}>
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className={`${result.timing.challenge ? 'text-red-300' : 'text-green-300'} font-bold uppercase tracking-wider text-xs`}>Timing Check</h4>
                                    <span className="text-white/40 text-xs">Year {result.personA.personalYear} vs {result.personB.personalYear}</span>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {result.timing.text}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 5. Gossip & Flags */}
                    {compatibility.gossip && (
                        <div className="relative">
                            {actualLocked && <PremiumLockOverlay title="Unlock The Gossip" />}
                            <div className={`p-8 bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-2xl border border-orange-500/10 ${actualLocked ? 'blur-sm opacity-30' : ''}`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-2xl">🥂</span>
                                    <div>
                                        <h3 className="text-white font-serif text-lg">The Sarcastic Friend&apos;s View</h3>
                                    </div>
                                </div>

                                <p className="text-white/90 italic mb-6">
                                    &quot;{compatibility.gossip.narrative}&quot;
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-black/20 p-4 rounded-xl">
                                        <span className="text-white/40 text-[10px] uppercase block mb-1">Argument Style</span>
                                        <p className="text-sm text-white/80">{compatibility.gossip.argumentStyle}</p>
                                    </div>
                                    <div className="bg-black/20 p-4 rounded-xl">
                                        <span className="text-white/40 text-[10px] uppercase block mb-1">Who Apologizes?</span>
                                        <p className="text-sm text-white/80">{compatibility.gossip.apologyWho}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-center pt-8">
                <button
                    onClick={onReset}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/10 font-medium text-sm"
                >
                    Check Another Connection
                </button>
            </div>
        </div>
    );
};
