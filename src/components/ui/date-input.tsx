"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function DateInput({ onSubmit }: { onSubmit: (date: string) => void }) {
    const [inputValue, setInputValue] = useState("");

    const formatInput = (value: string) => {
        // Remove everything except numbers
        const numbers = value.replace(/\D/g, "");

        let formatted = "";
        if (numbers.length > 0) {
            formatted += numbers.substring(0, 2);
            if (numbers.length >= 3) {
                formatted += "." + numbers.substring(2, 4);
            }
            if (numbers.length >= 5) {
                formatted += "." + numbers.substring(4, 8);
            }
        }
        return formatted;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.length === 10) {
            handleSubmit();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatInput(e.target.value);
        if (formatted.length <= 10) {
            setInputValue(formatted);
        }
    };

    const handleSubmit = () => {
        if (inputValue.length === 10) {
            onSubmit(inputValue);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="relative group w-full max-w-[280px]">
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="DD.MM.YYYY"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-b border-white/40 text-center text-3xl md:text-5xl font-serif text-gold focus:outline-none focus:border-gold transition-all placeholder:text-white/20 p-2 tracking-[0.1em]"
                />
            </div>

            <motion.button
                onClick={handleSubmit}
                className="group relative px-8 py-3 bg-white/5 border border-white/10 rounded-full overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-gold/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                    opacity: inputValue.length === 10 ? 1 : 0,
                    y: inputValue.length === 10 ? 0 : 10,
                    pointerEvents: inputValue.length === 10 ? "auto" : "none"
                }}
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
