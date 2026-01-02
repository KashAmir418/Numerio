import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Star, Heart, Briefcase, Zap, Moon, Sparkles, Calendar, Lock } from "lucide-react";
import { NumberReading, LayeredReading } from "@/types/numerology";

interface ReadingDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    reading: NumberReading | LayeredReading;
    number: number;
    title: string;
    isPremium: boolean;
    onUnlock: () => void;
}

const isLayered = (reading: NumberReading | LayeredReading): reading is LayeredReading => {
    return 'layer1_lifePath' in reading;
};

export const ReadingDrawer = ({ isOpen, onClose, reading, number, title, isPremium, onUnlock }: ReadingDrawerProps) => {
    if (!isOpen) return null;

    // Helper to extract the base reading for common sections if needed
    const baseReading = isLayered(reading) ? reading.layer1_lifePath : reading;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex justify-end">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Drawer */}
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-2xl h-full bg-[#050505] border-l border-white/10 shadow-2xl overflow-y-auto overflow-x-hidden scrollbar-hide"
                >
                    {/* Background Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="fixed top-6 right-6 z-50 text-white/40 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Content Container */}
                    <div className="relative z-10 p-8 md:p-12 max-w-xl mx-auto">

                        {/* Header */}
                        <div className="text-center mb-16 pt-12">
                            <span className="text-gold text-xs uppercase tracking-[0.3em] block mb-4">
                                {isLayered(reading) ? "The 3-Layer Deep Dive" : "Numerology Reading"}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">{baseReading.archetype}</h1>
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/30 text-gold text-2xl font-serif mb-6">
                                {number}
                            </div>
                            <p className="text-white/60 text-lg font-light leading-relaxed italic border-t border-b border-white/10 py-6">
                                &quot;{title}&quot;
                            </p>
                        </div>

                        {/* LAYER 1: THE CORE PATH (LIFE PATH) */}
                        <div className="space-y-16">

                            {/* Essence - ALWAYS FREE */}
                            <section>
                                <div className="flex items-center gap-3 mb-6 text-gold/80">
                                    <BookOpen size={20} />
                                    <h3 className="text-sm uppercase tracking-widest font-medium">The Essence</h3>
                                </div>
                                <div className="prose prose-invert prose-p:text-white/80 prose-p:font-light prose-p:leading-loose">
                                    <p className="whitespace-pre-line">{baseReading.essence}</p>
                                </div>
                            </section>

                            <div className="relative">
                                {/* Gated Content Wrapper */}
                                <div className={!isPremium ? "blur-md select-none pointer-events-none opacity-50" : ""}>
                                    {/* INTEGRATED INFLUENCES (Month & Day) */}
                                    {isLayered(reading) && (
                                        <section className="relative pl-6 border-l-2 border-gold/30 my-10 space-y-8">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-gold/50" />

                                            <div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Calendar size={16} className="text-gold/80" />
                                                    <h3 className="text-gold text-xs uppercase tracking-widest font-medium">The Seasonal Modifier ({reading.layer2_monthStats.monthName})</h3>
                                                </div>
                                                <p className="text-white/80 font-light leading-relaxed text-sm">
                                                    {reading.layer2_monthStats.influence}
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Sparkles size={16} className="text-gold/80" />
                                                    <h3 className="text-gold text-xs uppercase tracking-widest font-medium">The Daily Nuance (Day {reading.layer3_dayStats.dayNumber})</h3>
                                                </div>
                                                <p className="text-white/80 font-light leading-relaxed text-sm">
                                                    {reading.layer3_dayStats.nuance}
                                                </p>
                                            </div>
                                        </section>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                                        <section className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-gold/20 transition-colors">
                                            <div className="flex items-center gap-3 mb-6 text-yellow-400">
                                                <Zap size={20} />
                                                <h3 className="text-xs uppercase tracking-widest font-medium">Your Light</h3>
                                            </div>
                                            <ul className="space-y-3">
                                                {baseReading.light.map((point: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-white/70 font-light">
                                                        <span className="text-gold mt-1">•</span>
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                        <section className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-purple-500/20 transition-colors">
                                            <div className="flex items-center gap-3 mb-6 text-purple-400">
                                                <Moon size={20} />
                                                <h3 className="text-xs uppercase tracking-widest font-medium">Your Shadow</h3>
                                            </div>
                                            <ul className="space-y-3">
                                                {baseReading.shadow.map((point: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-white/70 font-light">
                                                        <span className="text-purple-400/50 mt-1">•</span>
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    </div>

                                    {/* Additional Gated Blocks */}
                                    <div className="space-y-16">
                                        <section>
                                            <div className="flex items-center gap-3 mb-6 text-pink-400/80">
                                                <Heart size={20} />
                                                <h3 className="text-sm uppercase tracking-widest font-medium">Love & Connection</h3>
                                            </div>
                                            <div className="prose prose-invert prose-p:text-white/80 prose-p:font-light prose-p:leading-loose">
                                                <p className="whitespace-pre-line">{baseReading.love}</p>
                                            </div>
                                        </section>

                                        <section>
                                            <div className="flex items-center gap-3 mb-6 text-blue-400/80">
                                                <Briefcase size={20} />
                                                <h3 className="text-sm uppercase tracking-widest font-medium">Career & Purpose</h3>
                                            </div>
                                            <div className="prose prose-invert prose-p:text-white/80 prose-p:font-light prose-p:leading-loose">
                                                <p className="whitespace-pre-line">{baseReading.career}</p>
                                            </div>
                                        </section>

                                        {/* Soul Lesson */}
                                        <section className="bg-gold/10 p-8 rounded-2xl border border-gold/20 text-center relative overflow-hidden mt-12 mb-20">
                                            <Star className="absolute top-4 right-4 text-gold/20 w-12 h-12" />
                                            <h3 className="text-gold text-sm uppercase tracking-widest font-medium mb-4">The Soul&apos;s Ultimate Lesson</h3>
                                            <p className="text-white/90 font-serif italic text-lg leading-relaxed whitespace-pre-line">
                                                &quot;{baseReading.soulLesson}&quot;
                                            </p>
                                        </section>
                                    </div>
                                </div>

                                {/* Unlock Overlay */}
                                {!isPremium && (
                                    <div className="absolute inset-x-0 top-0 bottom-0 z-20 flex flex-col items-center justify-start pt-20 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]">
                                        <div className="sticky top-40 flex flex-col items-center text-center px-6">
                                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                                                <Lock className="text-gold" size={24} />
                                            </div>
                                            <h3 className="text-2xl font-serif text-white mb-3">Decode the Rest</h3>
                                            <p className="text-white/50 text-sm max-w-xs mb-8 leading-relaxed">
                                                Discover your shadow traits, career purpose, and soul lessons with the Infinity Pass.
                                            </p>
                                            <button
                                                onClick={onUnlock}
                                                className="px-10 py-4 bg-gold text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all shadow-xl active:scale-95"
                                            >
                                                Unlock Full Library
                                            </button>
                                            <p className="text-[10px] text-white/20 uppercase tracking-widest mt-6">
                                                One-time purchase • Lifetime access
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
