"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarBackground } from "@/components/visuals/star-background";
import { DateInput } from "@/components/ui/date-input";
import { calculateNumerology, NumerologyProfile } from "@/utils/numerology";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function Home() {
    const [step, setStep] = useState<"entry" | "loading" | "dashboard">("entry");
    const [profile, setProfile] = useState<NumerologyProfile | null>(null);

    // Dynamic Soul Counter logic
    const [soulsClaimed, setSoulsClaimed] = useState(160);

    useEffect(() => {
        // Simple logic to "claim" souls based on time to create urgency
        const now = new Date();
        const startOfLaunch = new Date(now.getFullYear(), 0, 1); // Jan 1st
        const hoursPassed = Math.floor((now.getTime() - startOfLaunch.getTime()) / (1000 * 60 * 60));

        // Starts at 160, adds a few every hour
        const calculatedSouls = Math.min(987, 160 + (hoursPassed * 2) + now.getMinutes() % 10);
        setSoulsClaimed(calculatedSouls);
    }, []);

    const handleEntryComplete = (date: string) => {
        // Validation Logic
        const [yearStr, monthStr, dayStr] = date.split('-');
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);
        const day = parseInt(dayStr, 10);
        const currentYear = new Date().getFullYear();

        if (year < 1900 || year > currentYear) {
            alert("Please enter a valid birth year between 1900 and " + currentYear);
            return;
        }

        // Basic date validity (e.g. Feb 30)
        const dateObj = new Date(year, month - 1, day);
        if (dateObj.getFullYear() !== year || dateObj.getMonth() + 1 !== month || dateObj.getDate() !== day) {
            alert("Please enter a valid date.");
            return;
        }

        // Calculate numerology immediately
        const calculatedProfile = calculateNumerology(date);
        setProfile(calculatedProfile);

        setStep("loading");
        // Simulate calculation delay for dramatic effect
        setTimeout(() => {
            setStep("dashboard");
        }, 3000);
    };

    return (
        <main className={`relative min-h-screen flex flex-col items-center ${step === 'dashboard' ? 'justify-start overflow-x-hidden' : 'justify-center overflow-hidden'}`}>
            <StarBackground />

            {/* New Year Gift Banner */}
            {step === "entry" && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute top-0 left-0 w-full z-50 p-4 flex justify-center"
                >
                    <div className="bg-gold/10 backdrop-blur-md border border-gold/20 px-6 py-2 rounded-full flex items-center gap-4 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-gold animate-pulse rounded-full" />
                            <span className="text-[10px] md:text-xs text-gold font-black uppercase tracking-[0.2em]">New Year Gift</span>
                        </div>
                        <div className="w-[1px] h-4 bg-gold/20" />
                        <p className="text-[10px] md:text-xs text-white/80 font-light tracking-wide">
                            Free Infinity Pass for first 1,000 souls <span className="text-gold font-bold ml-2">({1000 - soulsClaimed} / 1000 left)</span>
                        </p>
                    </div>
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                {step === "entry" && (
                    <motion.div
                        key="entry"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative z-10 flex flex-col items-center gap-12"
                    >
                        <div className="text-center space-y-4">
                            <motion.h1
                                className="text-4xl md:text-6xl font-serif text-starlight tracking-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                When did your soul arrive?
                            </motion.h1>
                            <motion.p
                                className="text-white/40 font-light tracking-wide uppercase text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                            >
                                Enter your date of birth
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1 }}
                        >
                            <DateInput onSubmit={handleEntryComplete} />
                        </motion.div>
                    </motion.div>
                )}

                {step === "loading" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 text-center"
                    >
                        <motion.div
                            className="w-24 h-24 border border-gold/30 rounded-full mx-auto mb-8 relative"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute inset-2 border border-gold/50 rounded-full opacity-50" />
                            <div className="absolute inset-[10px] border border-gold/80 rounded-full opacity-30" />
                            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gold rounded-full shadow-[0_0_20px_#D4AF37]" />
                        </motion.div>
                        <h2 className="text-xl font-serif text-gold tracking-widest uppercase">Calculating Destiny...</h2>
                    </motion.div>
                )}

                {step === "dashboard" && profile && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10 w-full"
                    >
                        <Dashboard profile={profile} />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
