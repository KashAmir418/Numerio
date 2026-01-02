'use client';

import React, { useState } from "react";
import { CompatibilityForm } from "@/components/compatibility/compatibility-form";
import { CompatibilityResult } from "@/components/compatibility/compatibility-result";
import { calculateCompatibility } from "@/utils/compatibility";
import type { CompatibilityResult as CompatibilityResultType } from "@/utils/compatibility";

interface ConnectTabProps {
    isUnlocked: boolean;
    onUnlock: () => void;
    userTier?: 'FREE' | 'BASIC' | 'INFINITY';
    checksUsed?: number;
    onIncrementChecks?: () => void;
}

export const ConnectTab = React.memo(({
    isUnlocked,
    onUnlock,
    userTier = 'FREE',
    checksUsed = 0,
    onIncrementChecks
}: ConnectTabProps) => {

    // Local State for Compatibility
    const [compatibilityState, setCompatibilityState] = useState<{
        result: CompatibilityResultType | null;
        names: { nameA: string; nameB: string };
        isLoading: boolean;
    }>({
        result: null,
        names: { nameA: '', nameB: '' },
        isLoading: false
    });

    const [showCompatibilityForm, setShowCompatibilityForm] = useState(false);

    const handleCompatibilityCalculate = async (dateA: string, dateB: string, nameA: string, nameB: string) => {
        setCompatibilityState(prev => ({ ...prev, isLoading: true }));
        // Simulate processing for effect
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const data = calculateCompatibility(dateA, dateB);
            setCompatibilityState({
                result: data,
                names: { nameA, nameB },
                isLoading: false
            });
        } catch (error) {
            console.error("Compatibility calculation failed", error);
            setCompatibilityState(prev => ({ ...prev, isLoading: false }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-serif text-white mb-2">Soul Connections</h2>
                <p className="text-white/50 text-sm">Understand your relationships through the matrix.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-2 md:p-8 rounded-2xl relative overflow-hidden min-h-[500px] flex items-center justify-center">
                {!showCompatibilityForm && !compatibilityState.result ? (
                    <div className="flex flex-col items-center text-center p-8 animate-fade-in">
                        <div className="flex -space-x-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-xs text-white">You</div>
                            <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-xs text-white">?</div>
                        </div>
                        <h3 className="text-xl font-serif text-white mb-2">Check Compatibility</h3>
                        <p className="text-white/60 text-sm max-w-md mx-auto mb-6">
                            Is this a Karmic Lesson or a Twin Flame union? Discover the deeper dynamics of your connection.
                        </p>

                        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mx-auto opacity-50 mb-6 font-mono text-xs">
                            <div className="flex justify-between border-b border-white/10 pb-1">
                                <span className="text-white/40">Emotional</span>
                                <span className="text-green-400">High</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-1">
                                <span className="text-white/40">Intellectual</span>
                                <span className="text-yellow-400">Med</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowCompatibilityForm(true)}
                            className="px-8 py-3 bg-white text-black text-sm uppercase tracking-widest hover:bg-white/90 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            Start Analysis
                        </button>
                    </div>
                ) : (
                    <div className="w-full">
                        {!compatibilityState.result ? (
                            <div className="animate-fade-in w-full">
                                <CompatibilityForm
                                    onCalculate={handleCompatibilityCalculate}
                                    isLoading={compatibilityState.isLoading}
                                />
                            </div>
                        ) : (
                            <div className="animate-fade-in w-full">
                                <CompatibilityResult
                                    result={compatibilityState.result}
                                    names={compatibilityState.names}
                                    onReset={() => {
                                        setCompatibilityState(prev => ({ ...prev, result: null }));
                                        setShowCompatibilityForm(false);
                                    }}
                                    isLocked={!isUnlocked}
                                    onUnlock={onUnlock}
                                    userTier={userTier}
                                    checksUsed={checksUsed}
                                    onIncrementChecks={onIncrementChecks}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});
ConnectTab.displayName = "ConnectTab";
