"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gold p-4 text-center">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-serif mb-4"
            >
                A Glitch in the Matrix
            </motion.h2>
            <p className="text-white/50 mb-8 max-w-md">
                The universe encountered an unexpected alignment.
                {error.message || "Something went wrong."}
            </p>
            <button
                onClick={() => reset()}
                className="px-6 py-2 border border-gold/30 hover:bg-gold/10 rounded-full transition-all uppercase tracking-widest text-sm"
            >
                Realign
            </button>
        </div>
    );
}
