import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NumerologyProfile } from "@/utils/numerology";
import { calculateDestinyMatrix, MatrixNode } from "@/utils/destiny_matrix";
import { Lock, Sparkles, X, TrendingUp, Heart, ShieldAlert, MousePointer2 } from "lucide-react";

interface DestinyMatrixTabProps {
    profile: NumerologyProfile;
    isPremium: boolean;
    onShowPaywall: () => void;
}

export const DestinyMatrixTab = React.memo(({ profile, isPremium, onShowPaywall }: DestinyMatrixTabProps) => {
    const [selectedNode, setSelectedNode] = useState<MatrixNode | null>(null);

    // Parse date of birth
    const dob = useMemo(() => {
        const [y, m, d] = profile.dob.split('-').map(Number);
        return new Date(y, m - 1, d);
    }, [profile.dob]);

    const matrix = useMemo(() => calculateDestinyMatrix(dob), [dob]);

    const handleNodeClick = (node: MatrixNode) => {
        setSelectedNode(node);
    };

    // UI Configuration for the Matrix Nodes
    const nodePositions: Record<string, { x: string; y: string; color: string; icon?: any }> = {
        ancestral_top: { x: "50%", y: "5%", color: "#ffd700" },
        ancestral_right: { x: "95%", y: "50%", color: "#ffd700" },
        ancestral_bottom: { x: "50%", y: "95%", color: "#ff4d4d" },
        ancestral_left: { x: "5%", y: "50%", color: "#ffd700" },
        soul_center: { x: "50%", y: "50%", color: "#ffffff" },
        money_line: { x: "72.5%", y: "50%", color: "#4ade80", icon: TrendingUp },
        love_line: { x: "50%", y: "72.5%", color: "#f472b6", icon: Heart },
        karmic_tail: { x: "27.5%", y: "50%", color: "#fb923c", icon: ShieldAlert }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-20 p-4">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif text-starlight">The Destiny Matrix</h2>
                <p className="text-gold/40 text-xs tracking-widest uppercase font-medium">Your Archetypal Geometry</p>
            </div>

            <div className="relative aspect-square max-w-[500px] mx-auto bg-black/20 rounded-[3rem] border border-white/5 p-8 flex items-center justify-center overflow-hidden">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-radial-gradient from-gold/5 to-transparent pointer-events-none" />

                {/* The Geometric Grid (SVG) */}
                <svg className="absolute inset-0 w-full h-full p-8 overflow-visible" viewBox="0 0 100 100">
                    {/* Diagonal Square (Personality Square) */}
                    <motion.rect
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        x="15" y="15" width="70" height="70"
                        fill="none" stroke="white" strokeWidth="0.5"
                        style={{ transform: "rotate(45deg)", transformOrigin: "center" }}
                    />

                    {/* Straight Square (Ancestral Square) */}
                    <motion.rect
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                        x="15" y="15" width="70" height="70"
                        fill="none" stroke="white" strokeWidth="0.5"
                    />

                    {/* Connecting Lines (Channels) */}
                    <line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeWidth="0.1" strokeOpacity="0.2" />
                    <line x1="50" y1="5" x2="50" y2="95" stroke="white" strokeWidth="0.1" strokeOpacity="0.2" />
                </svg>

                {/* Nodes Display */}
                <div className="relative w-full h-full">
                    {Object.values(matrix.nodes).map((node) => {
                        const pos = nodePositions[node.id];
                        const Icon = pos.icon;

                        return (
                            <motion.div
                                key={node.id}
                                style={{ left: pos.x, top: pos.y }}
                                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                                whileHover={{ scale: 1.1 }}
                                onClick={() => handleNodeClick(node)}
                            >
                                <div className="group relative cursor-pointer">
                                    {/* node dot */}
                                    <div
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0a0a0a] border-2 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                                        style={{ borderColor: `${pos.color}44` }}
                                    >
                                        <span className="text-xl md:text-2xl font-serif text-white group-hover:text-gold transition-colors">
                                            {node.value}
                                        </span>
                                    </div>

                                    {/* Node Label (on hover) */}
                                    <div className="absolute top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[8px] uppercase tracking-widest text-white/60 whitespace-nowrap border border-white/10 z-30">
                                        {node.label}
                                    </div>

                                    {/* Channel Icon if any */}
                                    {Icon && (
                                        <div className="absolute -top-2 -right-2 bg-black border border-white/10 p-1 rounded-full text-gold">
                                            <Icon size={10} />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Instruction Overlay */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[9px] text-white/30 uppercase tracking-[0.2em] pointer-events-none">
                    <MousePointer2 size={10} />
                    Tap nodes to expand decode
                </div>
            </div>

            {/* Selected Node Details (Drawer-like feel) */}
            <AnimatePresence>
                {selectedNode && (
                    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedNode(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-t-3xl md:rounded-3xl p-8 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setSelectedNode(null)}
                                className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl font-serif text-gold">
                                        {selectedNode.value}
                                    </div>
                                    <div>
                                        <p className="text-gold/60 text-[10px] uppercase tracking-[0.2em] font-bold">{selectedNode.label}</p>
                                        <h3 className="text-2xl font-serif text-white">The Archetype of {selectedNode.value}</h3>
                                    </div>
                                </div>

                                <div className="relative min-h-[120px]">
                                    {!isPremium && (selectedNode.category === 'money' || selectedNode.category === 'love' || selectedNode.category === 'karmic' || selectedNode.category === 'soul') ? (
                                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/5">
                                            <Lock className="text-gold/60 mb-3" size={24} />
                                            <h4 className="text-white text-lg font-serif mb-2">Deep Decoder Restricted</h4>
                                            <p className="text-white/40 text-[11px] leading-relaxed mb-6 max-w-[280px]">
                                                Unlock your specific soul-level interpretations for money, love, and karma.
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setSelectedNode(null);
                                                    onShowPaywall();
                                                }}
                                                className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform"
                                            >
                                                Unlock Infinity Pass
                                            </button>
                                        </div>
                                    ) : null}

                                    <div className={(!isPremium && (selectedNode.category === 'money' || selectedNode.category === 'love' || selectedNode.category === 'karmic' || selectedNode.category === 'soul')) ? "blur-md opacity-20 pointer-events-none select-none" : ""}>
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                            <p className="text-white/80 text-lg font-light leading-relaxed italic">
                                                "{selectedNode.description}"
                                            </p>
                                        </div>

                                        <div className="mt-8 grid grid-cols-1 gap-4">
                                            <div className="p-4 rounded-xl bg-gold/5 border border-gold/10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Sparkles size={12} className="text-gold" />
                                                    <span className="text-gold/80 text-[10px] uppercase tracking-widest font-bold">Soul Guidance</span>
                                                </div>
                                                <p className="text-white/60 text-xs leading-relaxed">
                                                    This vibration indicates a need for {selectedNode.value % 2 === 0 ? 'structure and balance' : 'movement and expression'} in your {selectedNode.label.toLowerCase()}. Align with this frequency to unlock your natural flow.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Matrix Legend / Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10 border-t border-white/5">
                <div className="bg-white/[0.02] border border-white/10 p-6 rounded-3xl">
                    <TrendingUp className="text-green-400 mb-3" size={18} />
                    <h4 className="text-white text-sm font-serif mb-1">Money Gateway</h4>
                    <p className="text-white/40 text-[10px] leading-relaxed">Your natural financial frequency and how wealth flows to you.</p>
                </div>
                <div className="bg-white/[0.02] border border-white/10 p-6 rounded-3xl">
                    <Heart className="text-pink-400 mb-3" size={18} />
                    <h4 className="text-white text-sm font-serif mb-1">Love Channel</h4>
                    <p className="text-white/40 text-[10px] leading-relaxed">The ideal vibration for your partnerships and emotional fulfillment.</p>
                </div>
                <div className="bg-white/[0.02] border border-white/10 p-6 rounded-3xl">
                    <ShieldAlert className="text-orange-400 mb-3" size={18} />
                    <h4 className="text-white text-sm font-serif mb-1">Karmic Tail</h4>
                    <p className="text-white/40 text-[10px] leading-relaxed">The energetic patterns from the past you're here to resolve.</p>
                </div>
            </div>
        </div>
    );
});

DestinyMatrixTab.displayName = "DestinyMatrixTab";
