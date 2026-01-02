import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NumerologyProfile, getPersonalYearSummary, getMonthlyAdvice } from "@/utils/numerology";
import { PERSONAL_YEAR_CYCLES, getDailyReading } from "@/utils/interpretations";
import { Lock, Info, X, Palette, Sparkles } from "lucide-react";
import { getDailyColorRecommendation } from "@/utils/colors_content";

interface ForecastTabProps {
    profile: NumerologyProfile;
    isPremium: boolean;
    onShowPaywall: () => void;
}

export const ForecastTab = React.memo(({ profile, isPremium, onShowPaywall }: ForecastTabProps) => {
    const [activeInfoModal, setActiveInfoModal] = useState<'personalYear' | null>(null);

    // Current Date Formatting for the "Today" feel
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // Derived Data
    const personalYearSummary = getPersonalYearSummary(profile.forecast.personalYear);
    const personalDayInfo = getDailyReading(profile.forecast.personalDay);
    const universalDayInfo = getDailyReading(profile.forecast.universalDay);
    const personalYearInfo = PERSONAL_YEAR_CYCLES[profile.forecast.personalYear] || PERSONAL_YEAR_CYCLES[1];
    const dailyColor = getDailyColorRecommendation(profile.forecast.personalDay, profile.lifePathNumber);

    // Calculate Universal Year & Month
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    const reduceNum = (n: number): number => {
        let sum = n.toString().split('').reduce((a, b) => a + parseInt(b), 0);
        while (sum > 9) sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
        return sum;
    };

    const universalYearNum = reduceNum(currentYear);
    const universalMonthNum = reduceNum(universalYearNum + currentMonth);

    const universalMonthInfo = getDailyReading(universalMonthNum);
    const universalYearInfo = getDailyReading(universalYearNum);

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-fade-in-up pb-20">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-serif text-white mb-2">Cosmic Weather</h2>
                <p className="text-gold/60 text-xs tracking-[0.2em] uppercase font-medium">{dateString}</p>
            </div>

            {/* Info Modal */}
            <AnimatePresence>
                {activeInfoModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveInfoModal(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveInfoModal(null)}
                                className="absolute top-4 right-4 text-white/40 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            {/* Personal Year Info - Now Gated inside Modal or requires Premium */}
                            {activeInfoModal === 'personalYear' && (
                                <div className="space-y-6 text-center">
                                    <span className="text-gold text-xs uppercase tracking-widest block">{personalYearInfo.phase}</span>
                                    <h3 className="text-3xl font-serif text-white">Year {profile.forecast.personalYear}: {personalYearInfo.title}</h3>

                                    {!isPremium ? (
                                        <div className="py-8 space-y-4">
                                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[8px] z-10 flex flex-col items-center justify-center p-6 text-center">
                                                    <Lock className="text-gold/50 mb-4" size={28} />
                                                    <h4 className="text-white text-lg font-serif mb-2">Architect Your {currentYear}</h4>
                                                    <p className="text-white/40 text-[11px] leading-relaxed mb-6 max-w-[240px]">
                                                        Unlock the <span className="text-gold italic font-medium">Scary Accurate Strategy</span> for your current Personal Year cycle.
                                                    </p>
                                                    <button
                                                        onClick={() => {
                                                            setActiveInfoModal(null);
                                                            onShowPaywall();
                                                        }}
                                                        className="px-8 py-3 bg-gold text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform"
                                                    >
                                                        Access Strategy
                                                    </button>
                                                </div>
                                                <p className="text-white/20 select-none blur-md text-sm leading-relaxed text-left">
                                                    Your Personal Year {profile.forecast.personalYear} is a foundational period where the seeds of the next decade are sown. During this cycle, the cosmic alignment favors bold moves in your career while demanding a radical audit of your personal boundaries. This is not just a calendar year; it is a celestial window into your highest potential.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-4">
                                            <p className="text-white/80 leading-relaxed font-light">{personalYearInfo.description}</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-2 text-[10px] uppercase tracking-widest text-white/30 pt-4 border-t border-white/10">
                                        <div>Prev: Year {profile.forecast.personalYear - 1 > 0 ? profile.forecast.personalYear - 1 : 9}</div>
                                        <div>Next: Year {profile.forecast.personalYear + 1 < 10 ? profile.forecast.personalYear + 1 : 1}</div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. UNIVERSAL GLOBAL VIBE (FREE FOR EVERYONE) */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] flex-1 bg-white/10" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold whitespace-nowrap">Global Cosmic Highs</span>
                        <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Universal Day */}
                        <div className="bg-[#0d0d0d] border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-gold/60 text-[9px] uppercase tracking-widest font-bold">Universal Day</span>
                                <span className="text-3xl font-serif text-white">{profile.forecast.universalDay}</span>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed font-light min-h-[60px]">
                                {universalDayInfo.meaning}
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <span className="text-white/20 text-[9px] uppercase tracking-widest">Global Action</span>
                                <p className="text-gold/40 text-[10px] mt-1 italic">{universalDayInfo.opportunity}</p>
                            </div>
                        </div>

                        {/* Universal Month */}
                        <div className="bg-[#0d0d0d] border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-gold/60 text-[9px] uppercase tracking-widest font-bold">Universal Month</span>
                                <span className="text-3xl font-serif text-white">{universalMonthNum}</span>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed font-light min-h-[60px]">
                                {universalMonthInfo.meaning}
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <span className="text-white/20 text-[9px] uppercase tracking-widest">Collective Phase</span>
                                <p className="text-gold/40 text-[10px] mt-1 italic">{universalMonthInfo.opportunity}</p>
                            </div>
                        </div>

                        {/* Universal Year */}
                        <div className="bg-[#0d0d0d] border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-gold/60 text-[9px] uppercase tracking-widest font-bold">Universal Year</span>
                                <span className="text-3xl font-serif text-white">{universalYearNum}</span>
                            </div>
                            <p className="text-white/60 text-sm leading-relaxed font-light min-h-[60px]">
                                {universalYearInfo.meaning}
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <span className="text-white/20 text-[9px] uppercase tracking-widest">Annual Theme</span>
                                <p className="text-gold/40 text-[10px] mt-1 italic">The vibration of {currentYear}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. PERSONAL ALIGNMENT (GATED) */}
                <div className="md:col-span-2 space-y-6 pt-6">
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] flex-1 bg-white/10" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-bold whitespace-nowrap">Your Personal Alignment</span>
                        <div className="h-[1px] flex-1 bg-white/10" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Personal Day */}
                        <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-7 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Personal Day</span>
                                    <span className="text-5xl font-serif text-gold leading-none">{profile.forecast.personalDay}</span>
                                </div>

                                <div className="relative min-h-[100px]">
                                    {!isPremium && (
                                        <div className="absolute inset-x-0 -top-2 -bottom-2 bg-black/40 backdrop-blur-[6px] z-10 flex flex-col items-center justify-center rounded-2xl p-4 text-center border border-white/10">
                                            <Lock className="text-gold/60 mb-2" size={16} />
                                            <p className="text-white text-[11px] font-serif mb-3">Decode Your Alignment</p>
                                            <button
                                                onClick={onShowPaywall}
                                                className="px-4 py-1.5 bg-white text-black text-[9px] font-bold uppercase tracking-widest rounded-full"
                                            >
                                                Unlock Pass
                                            </button>
                                        </div>
                                    )}
                                    <div className={!isPremium ? "blur-md opacity-20 pointer-events-none select-none" : ""}>
                                        <p className="text-white/80 text-xs leading-relaxed font-light line-clamp-4">
                                            {personalDayInfo.meaning}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Month */}
                        <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-7 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Personal Month</span>
                                    <span className="text-5xl font-serif text-gold leading-none">{profile.forecast.personalMonth}</span>
                                </div>

                                <div className="relative min-h-[100px]">
                                    {!isPremium && (
                                        <div className="absolute inset-x-0 -top-2 -bottom-2 bg-black/40 backdrop-blur-[6px] z-10 flex flex-col items-center justify-center rounded-2xl p-4 text-center border border-white/10">
                                            <Lock className="text-gold/60 mb-2" size={16} />
                                            <p className="text-white text-[11px] font-serif mb-3">Master Your Month</p>
                                            <button
                                                onClick={onShowPaywall}
                                                className="px-4 py-1.5 bg-white text-black text-[9px] font-bold uppercase tracking-widest rounded-full"
                                            >
                                                Unlock Pass
                                            </button>
                                        </div>
                                    )}
                                    <div className={!isPremium ? "blur-md opacity-20 pointer-events-none select-none" : ""}>
                                        <p className="text-white/80 text-xs leading-relaxed font-light line-clamp-4">
                                            {getMonthlyAdvice(profile.forecast.personalYear, profile.forecast.personalMonth)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Year */}
                        <div
                            onClick={() => setActiveInfoModal('personalYear')}
                            className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-7 rounded-[2.5rem] relative overflow-hidden group cursor-pointer hover:border-gold/30 transition-all"
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Personal Year</span>
                                    <span className="text-5xl font-serif text-gold leading-none">{profile.forecast.personalYear}</span>
                                </div>

                                <div className="relative min-h-[100px]">
                                    {!isPremium && (
                                        <div className="absolute inset-x-0 -top-2 -bottom-2 bg-black/40 backdrop-blur-[6px] z-10 flex flex-col items-center justify-center rounded-2xl p-4 text-center border border-white/10">
                                            <Lock className="text-gold/60 mb-2" size={16} />
                                            <p className="text-white text-[11px] font-serif mb-3">View Year Strategy</p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onShowPaywall();
                                                }}
                                                className="px-4 py-1.5 bg-white text-black text-[9px] font-bold uppercase tracking-widest rounded-full"
                                            >
                                                Unlock Pass
                                            </button>
                                        </div>
                                    )}
                                    <div className={!isPremium ? "blur-md opacity-20 pointer-events-none select-none" : ""}>
                                        <p className="text-white/80 text-xs leading-relaxed font-light line-clamp-4">
                                            {personalYearSummary}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-[8px] text-gold font-bold uppercase tracking-widest">
                                            View Deep Strategy <Sparkles size={8} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. ALIGNED COLOR */}
                <div className="md:col-span-2">
                    <div className="pt-8 border-t border-white/10">
                        <div className="flex items-center gap-3 mb-6">
                            <Palette className="text-gold/60" size={14} />
                            <h4 className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">Today's Aligned Frequencies</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-4 p-5 bg-white/[0.03] rounded-2xl border border-white/5 group/color relative overflow-hidden">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-full border border-white/20 shadow-2xl shrink-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${dailyColor.color.hex}, ${dailyColor.color.hex}88)`,
                                            boxShadow: `0 0 20px ${dailyColor.color.hex}44`
                                        }}
                                    />
                                    <div>
                                        <span className="text-gold text-[9px] uppercase tracking-widest font-bold block mb-1">Power Color</span>
                                        <div className="text-white text-sm font-serif">{dailyColor.color.name}</div>
                                    </div>
                                </div>
                                <p className="text-white/40 text-[10px] leading-relaxed italic border-l border-gold/20 pl-4">
                                    {dailyColor.rationale}
                                </p>
                            </div>

                            {dailyColor.avoidColor && (
                                <div className="flex flex-col gap-4 p-5 bg-red-500/[0.02] rounded-2xl border border-red-500/5 opacity-60">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-10 h-10 rounded-full border border-white/10 shrink-0 grayscale"
                                            style={{ background: dailyColor.avoidColor.hex }}
                                        />
                                        <div>
                                            <span className="text-red-400/60 text-[9px] uppercase tracking-widest font-bold block mb-1">Discordant</span>
                                            <div className="text-white/40 text-sm font-serif line-through decoration-red-500/30">{dailyColor.avoidColor.name}</div>
                                        </div>
                                    </div>
                                    <p className="text-white/30 text-[10px] leading-relaxed italic border-l border-red-500/10 pl-4">
                                        {dailyColor.avoidRationale}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

ForecastTab.displayName = "ForecastTab";
