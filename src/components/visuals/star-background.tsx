"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function StarBackground() {
    // Generate random stars on client side to avoid hydration mismatch
    const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; delay: number }[]>([]);

    useEffect(() => {
        const newStars = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 5,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Deep Void Gradient Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0a0a10] via-void to-black opacity-80" />

            {/* Moving Stars (CSS Animated for performance) */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white opacity-20 animate-twinkle"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        '--twinkle-duration': `${4 + Math.random() * 3}s`,
                        '--twinkle-delay': `${star.delay}s`,
                    } as any}
                />
            ))}

            {/* Nebula / Dust Effect - Simplified for performance */}
            <motion.div
                className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-900/5 rounded-full blur-[80px]"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-purple-900/5 rounded-full blur-[60px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
