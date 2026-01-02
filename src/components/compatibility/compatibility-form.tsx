'use client';

import React, { useState } from 'react';

interface CompatibilityFormProps {
    onCalculate: (dateA: string, dateB: string, nameA: string, nameB: string) => void;
    isLoading: boolean;
}

export const CompatibilityForm: React.FC<CompatibilityFormProps> = ({ onCalculate, isLoading }) => {
    const [dateA, setDateA] = useState('');
    const [dateB, setDateB] = useState('');
    const [nameA, setNameA] = useState('');
    const [nameB, setNameB] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (dateA && dateB && nameA && nameB) {
            onCalculate(dateA, dateB, nameA, nameB);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Soul Connection Check
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="relative group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">Your Name</label>
                        <input
                            type="text"
                            required
                            value={nameA}
                            onChange={(e) => setNameA(e.target.value)}
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="relative group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">Your Birth Date</label>
                        <input
                            type="date"
                            required
                            value={dateA}
                            min="1900-01-01"
                            max="2025-12-31"
                            onChange={(e) => setDateA(e.target.value)}
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white [color-scheme:dark]"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center text-2xl text-purple-400">
                    +
                </div>

                <div className="space-y-4">
                    <div className="relative group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">Their Name</label>
                        <input
                            type="text"
                            required
                            value={nameB}
                            onChange={(e) => setNameB(e.target.value)}
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                            placeholder="Enter their name"
                        />
                    </div>
                    <div className="relative group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1">Their Birth Date</label>
                        <input
                            type="date"
                            required
                            value={dateB}
                            min="1900-01-01"
                            max="2025-12-31"
                            onChange={(e) => setDateB(e.target.value)}
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-white [color-scheme:dark]"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Connecting Souls...
                        </span>
                    ) : (
                        "Analyze Connection"
                    )}
                </button>
            </form>
        </div>
    );
};
