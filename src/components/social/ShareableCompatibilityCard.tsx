'use client';

import React, { useRef } from "react";
// import html2canvas from "html2canvas"; // Removed for SSR safety
import { CompatibilityResult } from "@/utils/compatibility_types";
import { Download, Sparkles } from "lucide-react";

interface ShareableCompatibilityCardProps {
    result: CompatibilityResult;
    names: { nameA: string; nameB: string };
}

export const ShareableCompatibilityCard = ({ result, names }: ShareableCompatibilityCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = React.useState<'idle' | 'generating' | 'success' | 'error'>('idle');

    const handleDownload = async () => {
        if (!cardRef.current) return;
        setStatus('generating');

        try {
            const html2canvas = (await import("html2canvas")).default;
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait for fonts/images

            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                backgroundColor: "#000000", // Default to black to match void
                useCORS: true,
                logging: false,
                allowTaint: true,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `numerio-cosmic-audit-${names.nameA}-${names.nameB}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setStatus('success');
            setTimeout(() => setStatus('idle'), 2000);
        } catch (err) {
            console.error("Failed to generate image", err);
            setStatus('error');
        }
    };

    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const formattedDate = mounted
        ? new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
        : '';

    // Derived Data
    const { compatibility } = result;
    const nameA = names.nameA || "Partner A";
    const nameB = names.nameB || "Partner B";

    return (
        <div className="flex flex-col items-center gap-8">
            {/* The Actual Card (DOM Element to Capture) */}
            <div
                ref={cardRef}
                className="relative w-[400px] h-[711px] overflow-hidden bg-[#050505] flex flex-col p-8 items-center bg-[url('/noise.png')] bg-repeat"
                style={{ fontFamily: 'var(--font-inter)' }}
            >
                {/* 1. Background Effects (The Void) */}
                <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-purple-900/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-red-900/20 to-transparent pointer-events-none" />
                <div className="absolute top-[20%] left-[-20%] w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[20%] right-[-20%] w-[300px] h-[300px] bg-red-600/10 blur-[100px] rounded-full" />

                {/* Border Frame */}
                <div className="absolute inset-4 border border-white/10 rounded-[32px] pointer-events-none z-20" />

                {/* 2. Header: The Title */}
                <div className="relative z-10 w-full text-center mt-6 mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                        <Sparkles size={10} className="text-gold" />
                        <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold">Cosmic Audit</span>
                    </div>
                    <h2 className="text-3xl font-serif text-white tracking-tight leading-none mb-1">
                        {nameA} <span className="text-white/30 text-2xl font-sans">&</span> {nameB}
                    </h2>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2">
                        {formattedDate}
                    </p>
                </div>

                {/* 3. The Central Score (The Heart) */}
                <div className="relative z-10 mb-8 flex flex-col items-center">
                    {/* Glowing Ring */}
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        {/* Glowing Ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(192,132,252,0.4)]">
                            <circle
                                cx="50%" cy="50%" r="76"
                                fill="none"
                                stroke="url(#card-gradient)"
                                strokeWidth="4"
                                strokeDasharray={2 * Math.PI * 76}
                                strokeDashoffset={2 * Math.PI * 76 * (1 - result.scores.total / 100)}
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="card-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#c084fc" />
                                    <stop offset="100%" stopColor="#f472b6" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className="flex flex-col items-center">
                            <span className="text-5xl font-bold text-white tracking-tighter shadow-black drop-shadow-lg">
                                {result.scores.total}%
                            </span>
                            <span className="text-[9px] text-purple-200 uppercase tracking-[0.2em] mt-1 bg-purple-500/10 px-2 py-0.5 rounded">
                                Bond Strength
                            </span>
                        </div>
                    </div>
                </div>

                {/* 4. The Viral Metrics (Glass Cards) */}
                <div className="w-full relative z-10 space-y-3 mb-8 px-2">
                    {/* Lust */}
                    <div className="relative h-10 bg-white/5 border border-white/10 rounded-lg flex items-center px-4 overflow-hidden">
                        <div className="absolute inset-0 bg-red-500/10" style={{ width: `${result.viralBreakdown?.lust}%` }} />
                        <div className="relative w-full flex justify-between items-center">
                            <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest">Lust</span>
                            <span className="text-sm font-bold text-white">{result.viralBreakdown?.lust}%</span>
                        </div>
                    </div>

                    {/* Logic */}
                    <div className="relative h-10 bg-white/5 border border-white/10 rounded-lg flex items-center px-4 overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500/10" style={{ width: `${result.viralBreakdown?.logic}%` }} />
                        <div className="relative w-full flex justify-between items-center">
                            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Logic</span>
                            <span className="text-sm font-bold text-white">{result.viralBreakdown?.logic}%</span>
                        </div>
                    </div>

                    {/* Toxic */}
                    <div className="relative h-10 bg-white/5 border border-white/10 rounded-lg flex items-center px-4 overflow-hidden">
                        <div className="absolute inset-0 bg-green-500/10" style={{ width: `${result.viralBreakdown?.toxic}%` }} />
                        <div className="relative w-full flex justify-between items-center">
                            <span className="text-[10px] font-bold text-green-300 uppercase tracking-widest">Toxicity</span>
                            <span className="text-sm font-bold text-white">{result.viralBreakdown?.toxic}%</span>
                        </div>
                    </div>
                </div>

                {/* 5. The Truth & Conflict */}
                <div className="w-full relative z-10 mb-auto px-2 space-y-3">
                    {/* Conflict Badge */}
                    {result.conflict_matrix && (
                        <div className="flex justify-between items-center bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                            <span className="text-[9px] uppercase tracking-widest text-red-300 font-bold">Conflict Protocol</span>
                            <span className="text-[9px] font-bold text-white max-w-[150px] text-right truncate">
                                {result.conflict_matrix.style}
                            </span>
                        </div>
                    )}

                    <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-5 rounded-2xl relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 p-2 opacity-10">🔥</div>
                        <p className="text-white/90 text-sm font-serif italic leading-relaxed">
                            &quot;{compatibility.viral?.roast}&quot;
                        </p>
                    </div>
                </div>

                {/* 6. Footer: Breakup Prob & Branding */}
                <div className="w-full relative z-10 text-center mt-auto mb-4">
                    {result.breakupPrediction && (
                        <div className="mb-6 flex justify-center items-center gap-2">
                            <span className="text-[10px] text-red-400 uppercase tracking-widest">Breakup Probability</span>
                            <span className="text-lg font-bold text-red-500">{result.breakupPrediction.chance}%</span>
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-2 opacity-50">
                        <div className="h-[1px] w-8 bg-white/20" />
                        <span className="text-[10px] font-bold tracking-[0.4em] text-white">NUMERIO</span>
                        <div className="h-[1px] w-8 bg-white/20" />
                    </div>
                </div>

            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 items-center">
                <button
                    onClick={handleDownload}
                    disabled={status === 'generating'}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-purple-500/20 disabled:opacity-50"
                >
                    {status === 'generating' ? (
                        <>Generating...</>
                    ) : status === 'success' ? (
                        <>Saved to Photos!</>
                    ) : (
                        <>
                            <Download size={16} /> Save Image
                        </>
                    )}
                </button>
                <p className="text-white/30 text-[10px] max-w-[300px] text-center">
                    Perfect for Instagram Stories & TikTok
                </p>
            </div>
        </div >
    );
};
