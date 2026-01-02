"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function DateInput({ onSubmit }: { onSubmit: (date: string) => void }) {
    const [date, setDate] = useState("");

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleSubmit = () => {
        if (date) {
            onSubmit(date);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="relative group">
                <input
                    type="date"
                    value={date}
                    min="1900-01-01"
                    max="2025-12-31"
                    onChange={handleDateChange}
                    className="w-full bg-transparent border-b border-white/20 text-center text-3xl md:text-4xl font-serif text-gold focus:outline-none focus:border-gold transition-colors placeholder:text-white/10 p-2 uppercase tracking-widest [color-scheme:dark]"
                    style={{ colorScheme: 'dark' }} // Forces dark calendar in supported browsers
                />
            </div>

            <motion.button
                onClick={handleSubmit}
                disabled={!date}
                className="group relative px-8 py-3 bg-white/5 border border-white/10 rounded-full overflow-hidden disabled:opacity-0 disabled:cursor-not-allowed transition-all duration-500 hover:bg-white/10 hover:border-gold/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: date ? 1 : 0, y: date ? 0 : 20 }}
            >
                <div className="relative z-10 flex items-center gap-2 text-starlight font-serif tracking-widest uppercase text-sm">
                    <span>Reveal Destiny</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
            </motion.button>
        </div>
    );
}
