"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarBackground } from "@/components/visuals/star-background";
import { DateInput } from "@/components/ui/date-input";
import { calculateNumerology, NumerologyProfile } from "@/utils/numerology";
import { Dashboard } from "@/components/dashboard/dashboard";

const LoadingText = () => {
    const [index, setIndex] = useState(0);
    const messages = [
        "Calculating Destiny...",
        "Decrypting Soul Frequency...",
        "Mapping Cosmic Blueprint...",
        "Synchronizing Arcanas...",
        "Finalizing Matrix..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 800);
        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            {messages[index]}
        </motion.span>
    );
};

export default function Home() {
    const [isReady, setIsReady] = useState(false);
    const [step, setStep] = useState<"entry" | "loading" | "dashboard">("entry");
    const [profile, setProfile] = useState<NumerologyProfile | null>(null);

    // Load profile from localStorage on mount
    useEffect(() => {
        // Check for ?reset=true in URL to allow testing the landing page
        const params = new URLSearchParams(window.location.search);
        if (params.get('reset') === 'true') {
            localStorage.removeItem('numerio_user_birthdate');
            window.history.replaceState({}, '', window.location.pathname);
            setIsReady(true);
            return;
        }

        const savedDate = localStorage.getItem('numerio_user_birthdate');
        if (savedDate) {
            const calculatedProfile = calculateNumerology(savedDate);
            setProfile(calculatedProfile);
            setStep("dashboard");
        }
        setIsReady(true);
    }, []);

    const handleEntryComplete = (dateStr: string) => {
        const [dayStr, monthStr, yearStr] = dateStr.split('.');
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10);

        const now = new Date();
        const currentYear = now.getFullYear();

        if (year < 1900 || year > currentYear) {
            alert(`Please enter a valid birth year between 1900 and ${currentYear}`);
            return;
        }

        const dateObj = new Date(year, month - 1, day);
        if (dateObj.getFullYear() !== year || dateObj.getMonth() + 1 !== month || dateObj.getDate() !== day) {
            alert("This date does not exist in the cosmic calendar. Please enter a real date.");
            return;
        }

        if (dateObj > now) {
            alert("The matrix shows you haven't arrived yet. Please enter a valid past birthdate.");
            return;
        }

        const internalDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        localStorage.setItem('numerio_user_birthdate', internalDate);

        const calculatedProfile = calculateNumerology(internalDate);
        setProfile(calculatedProfile);

        setStep("loading");
        setTimeout(() => {
            setStep("dashboard");
        }, 3000);
    };

    const handleReset = () => {
        localStorage.removeItem('numerio_user_birthdate');
        localStorage.removeItem('numerio_active_tab');
        setProfile(null);
        setStep("entry");
    };

    if (!isReady) return null;

    return (
        <main className="relative min-h-screen w-full bg-void flex flex-col items-center justify-start overflow-x-hidden">
            <StarBackground />

            {/* Always render dashboard if ready, but hide it behind loading */}
            {step === "dashboard" && profile && (
                <motion.div
                    key="dashboard"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 w-full"
                >
                    <Dashboard profile={profile} onReset={handleReset} />
                </motion.div>
            )}

            <AnimatePresence>
                {step === "entry" && (
                    <motion.div
                        key="entry"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center gap-12 px-4"
                    >
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl md:text-6xl font-serif text-starlight tracking-tight">
                                When did your soul arrive?
                            </h1>
                            <p className="text-white/40 font-light tracking-wide uppercase text-xs md:text-sm">
                                Enter your date of birth
                            </p>
                        </div>
                        <DateInput onSubmit={handleEntryComplete} />
                    </motion.div>
                )}

                {step === "loading" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void p-4"
                    >
                        <motion.div
                            className="w-24 h-24 border border-gold/30 rounded-full mx-auto mb-8 relative"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute inset-2 border border-gold/50 rounded-full opacity-50" />
                            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gold rounded-full" />
                        </motion.div>

                        <motion.h2 className="text-xl font-serif text-gold tracking-widest uppercase italic animate-pulse">
                            <LoadingText />
                        </motion.h2>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
