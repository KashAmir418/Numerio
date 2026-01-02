import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles, Infinity, Zap, Check, Heart, X, Loader2 } from "lucide-react";

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUnlockBasic?: () => void; // Keep for fallback/dev
    onUnlockInfinity?: () => void; // Keep for fallback/dev
    title: string;
    description: string;
}

export const PaywallModal = ({ isOpen, onClose, onUnlockBasic, onUnlockInfinity }: PaywallModalProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loadingTier, _setLoadingTier] = useState<'BASIC' | 'INFINITY' | null>(null);

    const handleCheckout = async (tier: 'BASIC' | 'INFINITY') => {
        // --- FREE BETA MODE ---
        // --- FREE BETA MODE ---
        // For launch, we are making this free. To enable Stripe later, 
        // uncomment the code below and set your environment variables.

        if (tier === 'BASIC') onUnlockBasic?.();
        if (tier === 'INFINITY') onUnlockInfinity?.();
        return;

        /* 
        setLoadingTier(tier);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tierName: tier }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Failed to create checkout session", data);
                alert("Something went wrong. Please try again later.");
                setLoadingTier(null);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Payment system is currently unavailable.");
            setLoadingTier(null);
        }
        */
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl z-20 flex flex-col md:flex-row overflow-hidden transform-gpu"
                    >
                        {/* Fixed Close Button - Higher Z-Index */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            className="absolute top-6 right-6 z-[60] text-white/20 hover:text-white hover:bg-white/10 transition-all p-2 rounded-full cursor-pointer"
                            aria-label="Close modal"
                        >
                            <X size={24} />
                        </button>

                        {/* Scrollable Content Wrapper */}
                        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto overflow-x-hidden scrollbar-hide relative">
                            {/* Background Glows */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />

                            {/* Left Side: Info & Context */}
                            <div className="md:w-1/3 p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 relative z-10">
                                <div className="w-16 h-16 bg-gold/5 border border-gold/20 rounded-2xl flex items-center justify-center mb-8">
                                    <Lock className="w-8 h-8 text-gold" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight">
                                    A Gift for the <br />
                                    <span className="text-gold">New Year</span>
                                </h3>
                                <p className="text-white/50 mb-8 font-light leading-relaxed text-sm">
                                    As a welcome to the matrix, we are granting the first 1,000 souls an <span className="text-gold font-bold">Infinity Pass</span> for free. Claim your lifetime map before the spots are gone.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-white/40 text-xs uppercase tracking-widest font-bold">
                                        <div className="w-8 h-[1px] bg-white/20" />
                                        Trusted by 50k+ seekers
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Options */}
                            <div className="md:w-2/3 p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

                                {/* Option 1: Basic */}
                                <div className="relative group bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col transition-all hover:bg-white/[0.04] hover:border-white/10">
                                    <div className="mb-6 text-left">
                                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                                            <Heart className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <h4 className="text-xl font-serif text-white mb-1">Compatibility Duo</h4>
                                        <p className="text-white/40 text-[10px] uppercase tracking-wider">Perfect for one connection</p>
                                    </div>

                                    <div className="flex-1 space-y-4 mb-8 text-left">
                                        <div className="flex items-start gap-3">
                                            <Check className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                            <span className="text-xs text-white/70">2 Full Compatibility Reveals</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Check className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                            <span className="text-xs text-white/70">Breakup Probability </span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Check className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                                            <span className="text-xs text-white/70">Shareable Synergy Cards</span>
                                        </div>
                                    </div>

                                    <div className="mb-6 text-left">
                                        <span className="text-3xl font-serif text-white">$9.99</span>
                                        <span className="text-white/30 text-[10px] uppercase tracking-widest ml-2 italic">Limited</span>
                                    </div>

                                    <button
                                        disabled={loadingTier !== null}
                                        onClick={() => handleCheckout('BASIC')}
                                        className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
                                    >
                                        CLAIM 2 REVEALS
                                    </button>
                                </div>

                                {/* Option 2: Infinity (Highlighted) */}
                                <div className="relative group bg-gradient-to-b from-gold/20 to-transparent border-2 border-gold/40 rounded-[2.5rem] md:rounded-4xl p-1 shadow-[0_0_50px_rgba(255,215,0,0.1)] md:scale-105 z-20 mt-4 md:mt-0">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gold text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg z-30">
                                        Best Value
                                    </div>

                                    <div className="bg-[#0a0a0a] rounded-[2.2rem] p-6 h-full flex flex-col">
                                        <div className="mb-6 text-left">
                                            <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                                                <Infinity className="w-5 h-5 text-gold" />
                                            </div>
                                            <h4 className="text-xl font-serif text-white mb-1">Infinity Pass</h4>
                                            <p className="text-gold/60 text-[10px] uppercase tracking-wider font-bold">The Complete Library</p>
                                        </div>

                                        <div className="flex-1 space-y-4 mb-8 text-left">
                                            <div className="flex items-start gap-3">
                                                <Sparkles className="w-4 h-4 text-gold mt-1 shrink-0" />
                                                <div>
                                                    <span className="text-xs text-white font-medium block">Everything in Duo</span>
                                                    <p className="text-[10px] text-white/40 leading-tight">All compatibility features included.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-1">
                                                    <Zap className="w-2.5 h-2.5 text-gold fill-gold" />
                                                </div>
                                                <div>
                                                    <span className="text-xs text-white/90 block">Unlimited Compatibility</span>
                                                    <p className="text-[10px] text-white/40 leading-tight">Check every partner, crush, or ex forever.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="w-4 h-4 text-gold mt-1 shrink-0" />
                                                <div>
                                                    <span className="text-xs text-white/90 block">5,000+ Word Deep Library</span>
                                                    <p className="text-[10px] text-white/40 leading-tight">Full Shadow Work & Life Path Architecture.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="w-4 h-4 text-gold mt-1 shrink-0" />
                                                <div>
                                                    <span className="text-xs text-white/90 block">Destiny Matrix Decoder</span>
                                                    <p className="text-[10px] text-white/40 leading-tight">Unlock Money, Love & Karmic lines.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="w-4 h-4 text-gold mt-1 shrink-0" />
                                                <div>
                                                    <span className="text-xs text-white/90 block">12-Month Forecast Path</span>
                                                    <p className="text-[10px] text-white/40 leading-tight">Celestial timing for every major decision.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-6 pt-4 border-t border-white/5 text-center">
                                            <div className="flex items-baseline justify-center gap-2 mb-1">
                                                <span className="text-4xl font-serif text-white">$22</span>
                                                <span className="text-white/20 line-through text-sm decoration-red-500/50">$66.00</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-gold/80 text-[10px] uppercase tracking-[0.2em] font-black">LIFETIME ACCESS UNLOCKED</span>
                                                <span className="text-white/20 text-[9px] uppercase tracking-widest mt-1">Pay once, own your soul&apos;s map forever</span>
                                            </div>
                                        </div>

                                        <button
                                            disabled={loadingTier !== null}
                                            onClick={() => handleCheckout('INFINITY')}
                                            className="w-full py-4 bg-gradient-to-r from-gold via-yellow-500 to-yellow-600 text-black font-black text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all duration-500 hover:-translate-y-1 transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            CLAIM FREE INFINITY PASS
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
