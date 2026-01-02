'use client';

import React, { useRef } from "react";
import { NumerologyProfile } from "@/utils/numerology";
import { getLayeredLifePathReading } from "@/utils/interpretations";
import { DestinyMatrixChart } from "@/components/visuals/destiny-matrix-chart";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

import { ZodiacSign } from "@/utils/zodiac";
import { COLOR_VIBRATIONS } from "@/utils/colors_content";

interface ShareableCardProps {
    profile: NumerologyProfile;
    flags: {
        red: string[];
        green: string[];
    };
    userName?: string;
    zodiac?: ZodiacSign;
}

export const ShareableCard = ({ profile, flags, userName, zodiac }: ShareableCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = React.useState<'idle' | 'generating' | 'success' | 'error'>('idle');

    // Derived Data
    const layeredReading = getLayeredLifePathReading(
        profile.lifePathNumber,
        profile.birthMonthNumber,
        profile.birthDayNumber
    );
    const archetype = layeredReading.layer1_lifePath.archetype;

    const handleDownload = async () => {
        if (!cardRef.current) return;
        setStatus('generating');

        try {
            // Wait a moment for images to load/render if needed
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(cardRef.current, {
                scale: 2, // High resolution
                backgroundColor: "#050505", // Match background
                useCORS: true, // IMPORTANT: Allows local images and CORS-enabled external images
                logging: true, // Enable logging to see what fails in console
                allowTaint: false, // DO NOT set to true, it blocks toDataURL
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);

            const image = canvas.toDataURL("image/png");

            // Create download link
            const link = document.createElement("a");
            link.href = image;
            link.download = `numerio-cosmic-id-${profile.lifePathNumber}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setStatus('success');
            setTimeout(() => setStatus('idle'), 2000); // Reset
        } catch (err) {
            console.error("Failed to generate image", err);
            setStatus('error');
            alert("Failed to generate image. Likely a security/CORS issue with an image.");
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">
            {/* The Actual Card (DOM Element to Capture) */}
            <div
                ref={cardRef}
                className="relative w-[400px] h-[711px] overflow-hidden bg-[#050505] text-white flex flex-col p-8 shadow-2xl"
                style={{ fontFamily: 'var(--font-inter)' }} // Ensure font loads
            >
                {/* Background Aesthetics */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] -mr-40 -mt-40" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 rounded-full blur-[100px] -ml-40 -mb-40" />
                {/* Noise - Ensure this path is correct or remove if problematic */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />

                {/* Header */}
                <div className="flex justify-between items-center mb-2 relative z-10">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Numerio</span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Soul Frequency</span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-start pt-2 relative z-10 text-center gap-4">

                    {/* User Name / Identity */}
                    <div className="animate-fade-in-up">
                        <p className="text-white/50 text-[9px] mb-1 tracking-widest uppercase">
                            {userName ? `${userName}'S SOUL IS A` : "THIS SOUL IS A"}
                        </p>
                        <h2 className="text-xl font-serif text-white uppercase tracking-widest leading-tight px-4">{archetype}</h2>
                    </div>

                    {/* Chart Visual - Increased size as requested */}
                    <div className="w-40 h-40 relative">
                        {/* We use a simplified version or just the chart here */}
                        <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full" />
                        <DestinyMatrixChart profile={profile} showTitle={false} />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 w-full px-4 mb-4">
                        <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                            <span className="block text-[9px] uppercase tracking-widest text-white/40 mb-1">Life Path</span>
                            <span className="text-2xl font-serif text-gold">{profile.lifePathNumber}</span>
                        </div>
                        {zodiac ? (
                            <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                                <span className="block text-[9px] uppercase tracking-widest text-white/40 mb-1">Sun Sign</span>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-xl">{zodiac.symbol}</span>
                                    <span className="text-lg font-serif text-white">{zodiac.name}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                                <span className="block text-[9px] uppercase tracking-widest text-white/40 mb-1">Attitude</span>
                                <span className="text-2xl font-serif text-white">{profile.attitudeNumber}</span>
                            </div>
                        )}
                    </div>

                    {/* Red / Green Flags (The "Roast") */}
                    <div className="w-full text-left space-y-3">
                        {flags.green[0] && (
                            <div className="flex flex-col gap-1 bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                                <span className="text-green-400 text-[9px] uppercase tracking-[0.2em] font-bold opacity-80">Gift</span>
                                <span className="text-white/95 text-[13px] leading-snug font-medium">{flags.green[0]}</span>
                            </div>
                        )}
                        {flags.red[0] && (
                            <div className="flex flex-col gap-1 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                                <span className="text-red-400 text-[9px] uppercase tracking-[0.2em] font-bold opacity-80">Glitch</span>
                                <span className="text-white/95 text-[13px] leading-snug font-medium">{flags.red[0]}</span>
                            </div>
                        )}
                    </div>

                    {/* Energy Palette - Side by Side */}
                    <div className="w-full grid grid-cols-2 gap-4 mt-2">
                        {/* Supportive Colors */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[8px] uppercase tracking-[0.2em] text-green-400/50 font-bold">Supportive</span>
                            <div className="flex justify-center gap-2">
                                {COLOR_VIBRATIONS[profile.lifePathNumber]?.fortunate.slice(0, 3).map((color, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1">
                                        <div
                                            className="w-8 h-8 rounded-full border border-white/20 shadow-lg"
                                            style={{
                                                background: `linear-gradient(135deg, ${color.hex}, ${color.hex}88)`,
                                                boxShadow: `0 0 10px ${color.hex}33`
                                            }}
                                        />
                                        <span className="text-[6px] uppercase tracking-tighter text-white/40 font-medium">
                                            {color.name.replace('Light ', '')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Resisting Colors */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[8px] uppercase tracking-[0.2em] text-red-400/50 font-bold">Resisting</span>
                            <div className="flex justify-center gap-2">
                                {COLOR_VIBRATIONS[profile.lifePathNumber]?.discordant.slice(0, 3).map((color, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1">
                                        <div
                                            className="w-8 h-8 rounded-full border border-white/20 shadow-lg grayscale"
                                            style={{
                                                background: `linear-gradient(135deg, ${color.hex}, ${color.hex}88)`,
                                            }}
                                        />
                                        <span className="text-[6px] uppercase tracking-tighter text-white/40 font-medium line-through">
                                            {color.name.replace('Light ', '')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-4 relative z-10">
                    <p className="text-[9px] text-white/20 uppercase tracking-[0.5em]">numerio.app</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-2">
                <button
                    onClick={handleDownload}
                    disabled={status === 'generating'}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium text-sm hover:bg-gray-200 transition-colors shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-1 transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'generating' ? (
                        <>Generating...</>
                    ) : status === 'success' ? (
                        <>Saved!</>
                    ) : (
                        <>
                            <Download size={16} />
                            Save to Photos
                        </>
                    )}
                </button>
                {status === 'error' && (
                    <p className="text-red-400 text-xs">Error generating image. Try taking a screenshot instead.</p>
                )}
            </div>
        </div>
    );
};
