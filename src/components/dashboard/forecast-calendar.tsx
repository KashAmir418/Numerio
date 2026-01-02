"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getDayQuality } from "@/utils/numerology";
import { PaywallModal } from "@/components/ui/paywall-modal";

interface ForecastCalendarProps {
    personalMonth: number;
    // personalYear: number; // Removed unused prop
}

export const ForecastCalendar = ({ personalMonth }: ForecastCalendarProps) => {
    const [showPaywall, setShowPaywall] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    // Mock calendar generation (for current month, simplified)
    const daysInMonth = 30; // Simply 30 for visual mock, real would use Date logic
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleDayClick = (day: number) => {
        setSelectedDay(day);
        setShowPaywall(true);
    };

    // Calculate quality for each day
    // Personal Day = Personal Month + Day
    // Reduce logic needed locally or imported. Since we need to map day -> quality.
    const getQualityForDay = (day: number) => {
        // Simplified reduce: (Personal Month + Day)
        let sum = personalMonth + day;
        while (sum > 9) {
            sum = sum.toString().split('').reduce((a, c) => a + parseInt(c), 0);
        }
        return getDayQuality(sum);
    };

    return (
        <>
            <div className="grid grid-cols-7 gap-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="text-center text-[10px] text-white/20 uppercase tracking-widest mb-2">
                        {d}
                    </div>
                ))}
                {days.map((day) => {
                    const quality = getQualityForDay(day);
                    const isGreen = quality === 'opportunity';
                    const isRed = quality === 'caution';

                    return (
                        <motion.button
                            key={day}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDayClick(day)}
                            className={`aspect-square rounded-lg flex items-center justify-center relative group overflow-hidden border border-white/5
                                ${isGreen ? 'bg-green-500/10 hover:bg-green-500/20 hover:border-green-500/30' : ''}
                                ${isRed ? 'bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/30' : ''}
                                ${quality === 'neutral' ? 'bg-white/5 hover:bg-white/10' : ''}
                            `}
                        >
                            <span className={`text-sm ${isGreen ? 'text-green-400' : isRed ? 'text-red-400' : 'text-white/60'}`}>
                                {day}
                            </span>

                            {/* Locked Indicator on Hover? Or just imply click to unlock */}
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-4 flex gap-4 justify-center text-[10px] uppercase tracking-widest text-white/30">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500/50" /> High Opportunity
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" /> Caution
                </div>
            </div>

            <PaywallModal
                isOpen={showPaywall}
                onClose={() => setShowPaywall(false)}
                title={`Unlock Day ${selectedDay}`}
                description={`Discover your personal strategy for the ${selectedDay}th. Unlock the vibrations of this high-energy day.`}
            />
        </>
    );
};
