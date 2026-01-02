"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarBackground } from "@/components/visuals/star-background";
import { DateInput } from "@/components/ui/date-input";
import { calculateNumerology, NumerologyProfile } from "@/utils/numerology";
import { Dashboard } from "@/components/dashboard/dashboard";
import posthog from "posthog-js";

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
    const [step, setStep] = useState<"entry" | "loading" | "dashboard">("entry");
    const [profile, setProfile] = useState<NumerologyProfile | null>(null);


    // Load profile from localStorage on mount
    useEffect(() => {
        const savedDate = localStorage.getItem('numerio_user_birthdate');
        if (savedDate) {
            const calculatedProfile = calculateNumerology(savedDate);
            setProfile(calculatedProfile);
            setStep("dashboard");
        }
    }, []);

    const handleEntryComplete = (dateStr: string) => {
        // Format: DD.MM.YYYY
        const [dayStr, monthStr, yearStr] = dateStr.split('.');
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10);

        const now = new Date();
        const currentYear = now.getFullYear();

        // 1. Basic Year Range Check
        if (year < 1900 || year > currentYear) {
            alert(`Please enter a valid birth year between 1900 and ${currentYear}`);
            return;
        }

        // 2. Real Date Validity (e.g. Feb 30)
        const dateObj = new Date(year, month - 1, day);
        if (dateObj.getFullYear() !== year || dateObj.getMonth() + 1 !== month || dateObj.getDate() !== day) {
            alert("This date does not exist in the cosmic calendar. Please enter a real date.");
            return;
        }

        // 3. Future Date Check
        if (dateObj > now) {
            alert("The matrix shows you haven't arrived yet. Please enter a valid past birthdate.");
            return;
        }

        // Convert to YYYY-MM-DD for the numerology calculator engine
        const internalDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // Save to localStorage for persistence
        localStorage.setItem('numerio_user_birthdate', internalDate);

        // Track Event
        posthog.capture('birthdate_submitted', {
            birthdate: internalDate,
            format: 'manual_entry'
        });

        // Calculate numerology immediately
        const calculatedProfile = calculateNumerology(internalDate);
        setProfile(calculatedProfile);

        setStep("loading");
        // Simulate calculation delay for dramatic effect
        setTimeout(() => {
            setStep("dashboard");
        }, 3000);
    };

    const handleReset = () => {
        localStorage.removeItem('numerio_user_birthdate');
        setProfile(null);
        setStep("entry");
    };

    return (
        <main className={`relative min-h-screen flex flex-col items-center ${step === 'dashboard' ? 'justify-start overflow-x-hidden' : 'justify-center overflow-hidden'}`}>
            <StarBackground />


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
                                transition={{ delay: 0.2, duration: 1 }}
                            >
                                When did your soul arrive?
                            </motion.h1>
                            <motion.p
                                className="text-white/60 font-light tracking-wide uppercase text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                Enter your date of birth
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
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

                        <div className="h-8">
                            <motion.h2
                                key={Math.floor(Date.now() / 1000) % 3} // Simple way to trigger re-animation if needed, but we'll use a local state for better control
                                className="text-xl font-serif text-gold tracking-widest uppercase animate-pulse"
                            >
                                <LoadingText />
                            </motion.h2>
                        </div>
                    </motion.div>
                )}

                {step === "dashboard" && profile && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10 w-full"
                    >
                        <Dashboard profile={profile} onReset={handleReset} />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
