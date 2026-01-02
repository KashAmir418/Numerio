'use client';

import React, { useState } from 'react';
import { CompatibilityForm } from '../../components/compatibility/compatibility-form';
import { CompatibilityResult } from '../../components/compatibility/compatibility-result';
import { calculateCompatibility, CompatibilityResult as ResultType } from '../../utils/compatibility';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CompatibilityPage() {
    const [result, setResult] = useState<ResultType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [names, setNames] = useState({ nameA: '', nameB: '' });
    const [isLocked, setIsLocked] = useState(true);

    const handleCalculate = async (dateA: string, dateB: string, nameA: string, nameB: string) => {
        setIsLoading(true);
        // Simulate a small delay for dramatic effect / "processing" feel
        await new Promise(resolve => setTimeout(resolve, 1500));

        const data = calculateCompatibility(dateA, dateB, nameA, nameB);
        setNames({ nameA, nameB });
        setResult(data);
        setIsLoading(false);
    };

    const handleReset = () => {
        setResult(null);
        setNames({ nameA: '', nameB: '' });
        setIsLocked(true); // Re-lock on reset
    };

    const handleUnlock = () => {
        setIsLocked(false);
    };

    return (
        <main className="min-h-screen bg-black text-white p-4 md:p-8 font-sans selection:bg-purple-500/30">
            {/* Background ambiance */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-900/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <header className="flex items-center justify-between mb-12">
                    <Link href="/" className="flex items-center text-gray-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </Link>
                </header>

                <div className="flex flex-col items-center justify-center min-h-[70vh]">
                    {!result ? (
                        <div className="w-full animate-fade-in-up">
                            <div className="text-center mb-10">
                                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent mb-4 tracking-tight">
                                    Soul Connection
                                </h1>
                                <p className="text-gray-400 text-lg max-w-xl mx-auto">
                                    Discover the deeper purpose of your relationship. <br />
                                    Not just compatibility, but the soul contract you share.
                                </p>
                            </div>
                            <CompatibilityForm onCalculate={handleCalculate} isLoading={isLoading} />
                        </div>
                    ) : (
                        <CompatibilityResult
                            result={result}
                            names={names}
                            onReset={handleReset}
                            isLocked={isLocked}
                            onUnlock={handleUnlock}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}
