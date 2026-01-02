'use client';

import React, { useState, useMemo } from "react";
import { NumerologyProfile } from "@/utils/numerology";
import { Info, Share2, X, Lock, Palette, ShieldAlert, Sparkles, Heart, Zap, ArrowRight, TrendingUp, RefreshCcw } from "lucide-react";
import {
    getLayeredLifePathReading,
    BIRTH_DAY_READINGS,
    MONTH_INFLUENCES,
    DAY_NUANCES,
    LIFE_PATH_READINGS
} from "@/utils/interpretations";
import { ShareableCard } from "@/components/social/ShareableCard";
import { motion, AnimatePresence } from "framer-motion";
import { getZodiacSign } from "@/utils/zodiac";
import { COLOR_VIBRATIONS } from "@/utils/colors_content";
import { DestinyMatrixChart } from "@/components/visuals/destiny-matrix-chart";

interface BlueprintTabProps {
    profile: NumerologyProfile;
    onOpenReading: (type: 'lifePath' | 'birthDay') => void;
    isPremium: boolean;
    onShowPaywall: () => void;
    onTabChange?: (tab: string) => void;
    onReset?: () => void;
}

export const BlueprintTab = React.memo(({ profile, onOpenReading, isPremium, onShowPaywall, onTabChange, onReset }: BlueprintTabProps) => {
    const [showShareModal, setShowShareModal] = useState(false);
    const [userName, setUserName] = useState("");
    const [isPaletteExpanded, setIsPaletteExpanded] = useState(false);

    // Calculate Zodiac (Memoized to prevent recalc)
    const zodiac = useMemo(() => {
        if (!profile.dob) return undefined;
        const [, mStr, dStr] = profile.dob.split('-');
        return getZodiacSign(parseInt(dStr), parseInt(mStr));
    }, [profile.dob]);

    // Derived Data
    const birthDayReading = BIRTH_DAY_READINGS[profile.birthDayNumber] || BIRTH_DAY_READINGS[1];

    // Safety check for Life Path reading
    const lpReading = LIFE_PATH_READINGS[profile.lifePathNumber] || LIFE_PATH_READINGS[1];

    // Get Flags (Roast)
    // We take the first 2-3 shadow traits as Red Flags
    // We take the first 2-3 light traits as Green Flags
    const redFlags = lpReading.shadow.slice(0, 2);
    const greenFlags = lpReading.light.slice(0, 2);

    // Layered Reading Logic
    const layeredLifePathReading = getLayeredLifePathReading(
        profile.lifePathNumber,
        profile.birthMonthNumber,
        profile.birthDayNumber
    );

    return (
        <div className="animate-fade-in-up">

            {/* Share Modal */}
            <AnimatePresence>
                {showShareModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowShareModal(false)}
                            className="fixed inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <div className="min-h-full flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative z-10 flex flex-col items-center gap-6 my-auto pointer-events-auto scale-90 md:scale-100"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="absolute -top-12 right-0 text-white/50 hover:text-white p-2"
                                >
                                    <X size={24} />
                                </button>

                                <div className="text-center">
                                    <h3 className="text-2xl font-serif text-white">Your Soul Frequency</h3>
                                    <p className="text-white/50 text-sm mt-1">
                                        Save this card and share it to your Story.
                                    </p>
                                </div>

                                {/* Name Input */}
                                <div className="w-full max-w-xs">
                                    <input
                                        type="text"
                                        placeholder="Enter your name (Optional)"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors font-serif uppercase tracking-widest text-sm"
                                        maxLength={15}
                                    />
                                    <p className="text-center text-[10px] text-white/30 mt-2 uppercase tracking-wider">
                                        Sign your energy signature
                                    </p>
                                </div>

                                <ShareableCard
                                    profile={profile}
                                    flags={{ red: redFlags, green: greenFlags }}
                                    userName={userName}
                                    zodiac={zodiac}
                                />
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
            <div className="space-y-6 md:space-y-16">
                <div className="flex flex-col items-center gap-6 pt-4">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-serif text-starlight mb-2">
                            Your Cosmic Blueprint
                        </h2>
                        <p className="text-white/60 font-light tracking-wide">
                            Life Path {profile.lifePathNumber}
                        </p>
                    </div>

                    <button
                        onClick={() => setShowShareModal(true)}
                        className="flex items-center gap-2 text-gold hover:text-white transition-colors text-xs uppercase tracking-widest border border-gold/20 px-6 py-2.5 rounded-full hover:border-gold/50 bg-gold/5 backdrop-blur-sm"
                    >
                        <Share2 size={14} /> Get Soul Card
                    </button>
                </div>

                <div className="flex flex-col gap-6 md:gap-12 max-w-5xl mx-auto">
                    {/* 1. DESTINY MATRIX CHART (CENTERED) */}
                    <div className="flex flex-col items-center">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-8 rounded-3xl w-full flex flex-col items-center justify-center relative overflow-hidden group hover:border-gold/30 transition-all duration-700 min-h-[400px] md:min-h-[500px]">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] -mr-40 -mt-40" />
                            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 rounded-full blur-[100px] -ml-40 -mb-40" />
                            <h3 className="text-gold font-serif text-xs mb-8 tracking-[0.3em] uppercase opacity-60">Destiny Matrix Archetype</h3>
                            <div className="relative z-10 scale-110 md:scale-125">
                                <DestinyMatrixChart profile={profile} />
                            </div>
                        </div>
                    </div>

                    {/* 2. NUMBERS GRID (CORE VIBRATIONS) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Life Path Card - Large */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:bg-white/10 group lg:col-span-2">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-white/50 font-serif text-[10px] uppercase tracking-widest mb-1">Life Path</h3>
                                    <div className="text-7xl font-serif text-gold">
                                        {profile.lifePathNumber}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-white/50 font-serif text-[10px] uppercase tracking-widest mb-1">Soul Archetype</h3>
                                    <div className="text-2xl font-serif text-white uppercase tracking-tighter mt-2">
                                        {layeredLifePathReading.layer1_lifePath.archetype}
                                    </div>
                                </div>
                            </div>
                            <p className="text-white/70 font-light text-sm leading-relaxed mt-6 max-w-lg">
                                Your Life Path {profile.lifePathNumber} defines your core mission. You are wired to express the frequency of the {layeredLifePathReading.layer1_lifePath.archetype}.
                            </p>
                            <button
                                onClick={() => onOpenReading('lifePath')}
                                className="mt-6 flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors group/btn"
                            >
                                <Info size={14} />
                                Full Deep Dive
                            </button>
                        </div>

                        {/* Matrix Grid Numbers (Cube/Space Saving) */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
                            <div className="mb-6">
                                <h3 className="text-white/50 font-serif text-[10px] uppercase tracking-widest mb-4">Destiny Keys</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <div className="flex-1 pr-4">
                                            <span className="text-[10px] uppercase tracking-widest text-gold block mb-1">Birth Day</span>
                                            <p className="text-white/60 text-[12px] leading-relaxed italic font-light">
                                                {birthDayReading.archetype}: {birthDayReading.soulLesson.split('.')[0]}
                                            </p>
                                        </div>
                                        <span className="text-3xl font-serif text-white">{profile.birthDayNumber}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <div className="flex-1 pr-4">
                                            <span className="text-[10px] uppercase tracking-widest text-white/50 block mb-1">Birth Month</span>
                                            <p className="text-white/60 text-[12px] leading-relaxed italic font-light">
                                                {MONTH_INFLUENCES[profile.birthMonthNumber]?.split('.')[0]}
                                            </p>
                                        </div>
                                        <span className="text-3xl font-serif text-white">{profile.birthMonthNumber}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 pr-4">
                                            <span className="text-[10px] uppercase tracking-widest text-white/50 block mb-1">Birth Year</span>
                                            <p className="text-white/60 text-[12px] leading-relaxed italic font-light">
                                                Karmic Influence: {LIFE_PATH_READINGS[profile.birthYearNumber]?.essence.split(':')[0] || "Past Life Mastery"}
                                            </p>
                                        </div>
                                        <span className="text-3xl font-serif text-white">{profile.birthYearNumber}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-white/30 text-[9px] leading-relaxed italic border-t border-white/5 pt-4">
                                These arcana form the pillars of your destiny matrix.
                            </p>
                        </div>
                    </div>

                    {/* 3. ONE GIFT AND ONE CHALLENGE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-500/[0.03] border border-green-500/10 p-8 rounded-2xl relative overflow-hidden group">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-500/10 rounded-lg">
                                    <Sparkles className="text-green-400" size={18} />
                                </div>
                                <h3 className="text-green-400/80 font-serif text-xs uppercase tracking-[0.3em] font-bold">Divine Gift</h3>
                            </div>
                            <p className="text-white/90 text-lg font-serif leading-relaxed italic">
                                "{greenFlags[0]}"
                            </p>
                            <p className="text-white/40 text-xs mt-4 font-light">Your highest natural advantage in this incarnation.</p>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all" />
                        </div>

                        <div className="bg-red-500/[0.03] border border-red-500/10 p-8 rounded-2xl relative overflow-hidden group">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-red-500/10 rounded-lg">
                                    <ShieldAlert className="text-red-400" size={18} />
                                </div>
                                <h3 className="text-red-400/80 font-serif text-xs uppercase tracking-[0.3em] font-bold">Core Challenge</h3>
                            </div>
                            <p className="text-white/90 text-lg font-serif leading-relaxed italic">
                                "{redFlags[0]}"
                            </p>
                            <p className="text-white/40 text-xs mt-4 font-light">The shadow frequency that requires conscious awareness.</p>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-all" />
                        </div>
                    </div>

                    {/* 4. COSMIC COLORS SECTION (COLLAPSED BY DEFAULT) */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 ease-in-out">
                        <div className="p-8 md:p-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gold/10 rounded-lg">
                                        <Palette className="text-gold" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-serif text-lg">Energy Palette</h3>
                                        <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">Harmonize Your Vibration</p>
                                    </div>
                                </div>

                                {!isPaletteExpanded && (
                                    <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-2xl">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                                                style={{ backgroundColor: COLOR_VIBRATIONS[profile.lifePathNumber]?.fortunate[0].hex }}
                                            />
                                            <span className="text-white/60 text-[10px] uppercase tracking-widest leading-none">
                                                {COLOR_VIBRATIONS[profile.lifePathNumber]?.fortunate[0].name}
                                            </span>
                                        </div>
                                        <div className="h-4 w-[1px] bg-white/10" />
                                        <button
                                            onClick={() => setIsPaletteExpanded(true)}
                                            className="text-gold text-[10px] uppercase tracking-widest font-bold hover:text-white transition-colors flex items-center gap-2 group/btn"
                                        >
                                            Expand Palette <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <AnimatePresence>
                                {isPaletteExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-8">
                                            <p className="text-white/30 text-[11px] leading-relaxed mb-10 font-light max-w-xl">
                                                Colors occupy specific frequencies on the electromagnetic spectrum. When your core Life Path vibration aligns with these shades, it amplifies your energy and reduces spiritual static.
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 pb-4">
                                                {/* Fortunate Colors */}
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-2 text-green-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                                                        <Sparkles size={12} />
                                                        Fortunate Vibrations
                                                    </div>
                                                    <div className="grid gap-4">
                                                        {COLOR_VIBRATIONS[profile.lifePathNumber]?.fortunate.map((color, i) => (
                                                            <div key={i} className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group/color">
                                                                <div
                                                                    className="w-14 h-14 rounded-full border-2 border-white/20 shadow-2xl shrink-0 transition-transform duration-500 group-hover/color:scale-110"
                                                                    style={{
                                                                        background: `linear-gradient(135deg, ${color.hex}, ${color.hex}88)`,
                                                                        boxShadow: `0 0 25px ${color.hex}44`
                                                                    }}
                                                                />
                                                                <div>
                                                                    <div className="text-white text-md font-medium tracking-wide">{color.name}</div>
                                                                    <div className="text-white/40 text-[11px] leading-relaxed mt-1 font-light">{color.description}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Discordant Colors */}
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-2 text-red-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                                                        <ShieldAlert size={12} />
                                                        Discordant Tones
                                                    </div>
                                                    <div className="grid gap-4">
                                                        {COLOR_VIBRATIONS[profile.lifePathNumber]?.discordant.map((color, i) => (
                                                            <div key={i} className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group/color">
                                                                <div
                                                                    className="w-14 h-14 rounded-full border-2 border-white/10 shadow-lg shrink-0 grayscale-[0.3] transition-transform duration-500 group-hover/color:scale-110"
                                                                    style={{
                                                                        background: `linear-gradient(135deg, ${color.hex}, ${color.hex}66)`,
                                                                    }}
                                                                />
                                                                <div>
                                                                    <div className="text-white/70 text-md font-medium tracking-wide">{color.name}</div>
                                                                    <div className="text-white/40 text-[11px] leading-relaxed mt-1 font-light">{color.description}</div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8 flex justify-center">
                                                <button
                                                    onClick={() => setIsPaletteExpanded(false)}
                                                    className="text-white/30 text-[10px] uppercase tracking-widest font-bold hover:text-white transition-colors"
                                                >
                                                    Close Palette
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Background Decorative Element */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none" />
                    </div>

                    {/* 5. EXPLORE MORE SECTION */}
                    <div className="pt-12 border-t border-white/5">
                        <div className="text-center mb-10">
                            <h3 className="text-gold font-serif text-xs mb-3 tracking-[0.3em] uppercase opacity-60">Deepen Your Journey</h3>
                            <p className="text-white/40 text-sm font-light">Explore other dimensions of your cosmic signature.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Destiny Matrix Teaser */}
                            <button
                                onClick={() => onTabChange?.("Destiny Matrix")}
                                className="group relative bg-[#0a0a0a]/40 border border-white/10 rounded-3xl p-8 text-left overflow-hidden hover:border-gold/50 transition-all duration-500 active:scale-[0.98] shadow-2xl"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-gold/10 transition-colors" />
                                <div className="relative z-10">
                                    <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gold/10 border border-gold/20 text-gold text-[8px] font-bold uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        Highly Requested
                                    </span>
                                    <div className="p-3 bg-gold/10 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <TrendingUp className="text-gold" size={24} />
                                    </div>
                                    <h4 className="text-xl font-serif text-white mb-2">Destiny Matrix</h4>
                                    <p className="text-white/50 text-xs font-light leading-relaxed mb-6">
                                        Decode your <span className="text-gold/80 italic font-medium underline underline-offset-4 decoration-gold/20">Money & Love lines</span>. Discover the architectural blueprint of your fate.
                                    </p>
                                    <div className="flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.2em] font-bold">
                                        Show My Fate <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </button>

                            {/* Compatibility Teaser */}
                            <button
                                onClick={() => onTabChange?.("Compatibility")}
                                className="group relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-left overflow-hidden hover:border-pink-500/30 transition-all duration-500 active:scale-[0.98]"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-pink-500/20 transition-colors" />
                                <div className="relative z-10">
                                    <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[8px] font-bold uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        Scary Accurate
                                    </span>
                                    <div className="p-3 bg-pink-500/10 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <Heart className="text-pink-400" size={24} />
                                    </div>
                                    <h4 className="text-xl font-serif text-white mb-2">Soul Compatibility</h4>
                                    <p className="text-white/50 text-xs font-light leading-relaxed mb-6">
                                        Sync your frequency with a partner to decode the <span className="text-pink-400/80 italic font-medium">Hidden Dynamics</span> of your connection.
                                    </p>
                                    <div className="flex items-center gap-2 text-pink-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                                        Analyze Synergy <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </button>

                            {/* Forecast Teaser */}
                            <button
                                onClick={() => onTabChange?.("Forecast")}
                                className="group relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-left overflow-hidden hover:border-gold/30 transition-all duration-500 active:scale-[0.98]"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-gold/20 transition-colors" />
                                <div className="relative z-10">
                                    <div className="p-3 bg-gold/10 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <Zap className="text-gold" size={24} />
                                    </div>
                                    <h4 className="text-xl font-serif text-white mb-2">Cosmic Forecast</h4>
                                    <p className="text-white/50 text-xs font-light leading-relaxed mb-6">
                                        Navigate your personal cycles and discover the <span className="text-gold/80 italic font-medium">Celestial Weather</span> for the days ahead.
                                    </p>
                                    <div className="flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.2em] font-bold">
                                        View My Timeline <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* 6. RESET / CHECK ANOTHER SOUL SECTION */}
                    <div className="pt-24 pb-12 flex flex-col items-center">
                        <button
                            onClick={onReset}
                            className="group flex flex-col items-center gap-4 transition-all duration-500"
                        >
                            <div className="p-4 bg-white/5 border border-white/10 rounded-full group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-700 active:scale-90">
                                <RefreshCcw className="text-white/40 group-hover:text-gold transition-colors" size={24} />
                            </div>
                            <div className="text-center">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 group-hover:text-gold/50 transition-colors font-bold">New Reading</span>
                                <h4 className="text-white/60 group-hover:text-white transition-colors font-serif mt-1 italic tracking-wide">Analyze another soul?</h4>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});
BlueprintTab.displayName = "BlueprintTab";
