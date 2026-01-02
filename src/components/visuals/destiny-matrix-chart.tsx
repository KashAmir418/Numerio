'use client';

import React from "react";
import { motion } from "framer-motion";
import { NumerologyProfile } from "@/utils/numerology";

// --- Types & Interfaces ---
interface DestinyMatrixChartProps {
    profile: NumerologyProfile;
    className?: string;
}

interface MatrixNodeProps {
    x: number;
    y: number;
    value: number;
    subLabel?: string;
    delay: number;
    special?: boolean;
    scale?: number;
    icon?: "heart" | "dollar";
}

// --- Icons (Refined, Premium, Thin Strokes) ---
const ICONS = {
    heart: "M12 21.35C12 21.35 5 15.5 5 10.5C5 7.5 7.5 5 9.5 5C11 5 12 7 12 7C12 7 13 5 14.5 5C16.5 5 19 7.5 19 10.5C19 15.5 12 21.35 12 21.35Z",
    dollar: "M12 2L15 8L21 12L15 16L12 22L9 16L3 12L9 8L12 2ZM12 6V18"
};


// --- Animation Variants ---
const nodePop = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
        scale: 1,
        opacity: 1,
        transition: { delay: custom, duration: 1.5, type: "spring", bounce: 0.2 }
    })
};

// --- Sub-Components ---

const MatrixNode = ({ x, y, value, subLabel, delay, special = false, scale = 1, icon }: MatrixNodeProps) => {
    // Sizing: Increased to 14 (was 12) for Larger Numbers
    const baseRadius = 14;
    const r = baseRadius * scale;
    const fontSize = icon ? 0 : 10.5 * scale; // Text scaled up (was 8)

    return (
        <motion.g
            custom={delay}
            variants={nodePop}
            initial="hidden"
            animate="visible"
            className="group"
            style={{ transformOrigin: `${x}px ${y}px` }}
        >
            {/* Glow Behind */}
            <circle cx={x} cy={y} r={r * 1.5} className="fill-[#D4AF37]/10 blur-xl" />

            {/* Main Ring */}
            <circle
                cx={x}
                cy={y}
                r={r}
                className={`transition-all duration-700 ${special ? 'fill-[#1a1500] stroke-[#D4AF37]' : icon ? 'fill-[#1a0f0f] stroke-[#D4AF37]/50' : 'fill-[#050505] stroke-[#D4AF37]'
                    } ${special ? 'stroke-[0.8]' : 'stroke-[0.4]'} shadow-2xl`}
            />

            {/* Inner Ring (Detail) */}
            <circle
                cx={x}
                cy={y}
                r={r * 0.85}
                className="fill-none stroke-[#D4AF37]/20 stroke-[0.2]"
            />

            {/* Content */}
            {icon ? (
                <g transform={`translate(${x - (r * 0.5)}, ${y - (r * 0.5)}) scale(${(r) / 24})`}>
                    <path
                        d={ICONS[icon]}
                        className={`transition-colors duration-500 fill-none stroke-[1.5] ${icon === 'heart' ? 'stroke-[#ff8e8e]' : 'stroke-[#8effc1]'
                            }`}
                        strokeLinecap="round" strokeLinejoin="round"
                    />
                </g>
            ) : (
                <text
                    x={x}
                    y={y}
                    dy={fontSize * 0.35}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className={`font-serif ${special ? 'fill-[#FFF8E7] font-bold' : 'fill-[#E8DCC0] font-medium'
                        } select-none pointer-events-none drop-shadow-md`}
                    style={{ fontSize: `${fontSize}px` }}
                >
                    {value}
                </text>
            )}

            {/* Static Sub-Label */}
            {subLabel && (
                <text
                    x={x}
                    y={y + r + 10} // Increased offset for larger nodes
                    textAnchor="middle"
                    className="text-[4.5px] fill-[#D4AF37]/60 font-serif uppercase tracking-[0.25em] font-light"
                >
                    {subLabel}
                </text>
            )}
        </motion.g>
    );
};

// --- Main Component ---

// --- Main Component ---

const DestinyMatrixChartBase = React.memo(({ profile, className = "", showTitle = true }: DestinyMatrixChartProps & { showTitle?: boolean }) => {
    // --- SCALED COORDINATE SYSTEM (0-200) ---
    const R = 80;
    const OFF = 56;
    const CENTER = { x: 100, y: 100 };

    // Coords
    const TOP = { x: 100, y: 100 - R, val: profile.birthMonthNumber, label: "MONTH" };
    const RIGHT = { x: 100 + R, y: 100, val: profile.birthYearNumber, label: "YEAR" };
    const BOTTOM = { x: 100, y: 100 + R, val: profile.lowerAnchor, label: "ANCHOR" };
    const LEFT = { x: 100 - R, y: 100, val: profile.birthDayNumber, label: "DAY" };

    const TL = { x: 100 - OFF, y: 100 - OFF };
    const TR = { x: 100 + OFF, y: 100 - OFF };
    const BL = { x: 100 - OFF, y: 100 + OFF };
    const BR = { x: 100 + OFF, y: 100 + OFF };

    // Values
    const tlVal = profile.matrixExtras?.femaleLine || 0;
    const trVal = profile.matrixExtras?.maleLine || 0;
    const blVal = profile.matrixExtras?.earthLine || 0;
    const brVal = profile.matrixExtras?.skyLine || 0;

    const loveNode = { x: 136, y: 136, val: profile.matrixExtras?.love || 6, label: "LOVE" };
    const moneyNode = { x: 136, y: 64, val: profile.matrixExtras?.money || 5, label: "MONEY" };


    return (
        <div className={`aspect-square w-full max-w-[800px] relative mx-auto select-none ${className} flex items-center justify-center`}>
            {/* Background Glow Container */}
            <div className="absolute inset-0 bg-radial-gradient from-[#D4AF37]/5 to-transparent opacity-50 rounded-full blur-xl pointer-events-none transform scale-75" />

            {/* ZOOMED ViewBox: 0 0 200 200 (Was -20 -20 240 240) -> This removes padding and makes chart LARGER */}
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible z-10">

                {/* LAYER 1: The Geometry */}
                <g>
                    {/* Octagram Outline */}
                    <motion.path
                        d={`M ${TOP.x} ${TOP.y} L ${TR.x} ${TR.y} L ${RIGHT.x} ${RIGHT.y} L ${BR.x} ${BR.y} L ${BOTTOM.x} ${BOTTOM.y} L ${BL.x} ${BL.y} L ${LEFT.x} ${LEFT.y} L ${TL.x} ${TL.y} Z`}
                        className="fill-none stroke-[#D4AF37]" strokeOpacity="0.15" strokeWidth="0.2"
                    />

                    {/* Diamond */}
                    <motion.path
                        d={`M ${TOP.x} ${TOP.y} L ${RIGHT.x} ${RIGHT.y} L ${BOTTOM.x} ${BOTTOM.y} L ${LEFT.x} ${LEFT.y} Z`}
                        className="fill-none stroke-[#D4AF37]" strokeOpacity="0.4" strokeWidth="0.5"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }}
                    />
                    {/* Square */}
                    <motion.path
                        d={`M ${TL.x} ${TL.y} L ${TR.x} ${TR.y} L ${BR.x} ${BR.y} L ${BL.x} ${BL.y} Z`}
                        className="fill-none stroke-[#D4AF37]" strokeOpacity="0.4" strokeWidth="0.5"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 3, ease: "easeInOut" }}
                    />

                    {/* Crosses */}
                    <motion.path d={`M ${TOP.x} ${TOP.y} L ${BOTTOM.x} ${BOTTOM.y}`} className="stroke-[#D4AF37]" strokeOpacity="0.2" strokeWidth="0.3" />
                    <motion.path d={`M ${LEFT.x} ${LEFT.y} L ${RIGHT.x} ${RIGHT.y}`} className="stroke-[#D4AF37]" strokeOpacity="0.2" strokeWidth="0.3" />
                    <motion.path d={`M ${TL.x} ${TL.y} L ${BR.x} ${BR.y}`} className="stroke-[#D4AF37]" strokeOpacity="0.2" strokeWidth="0.3" />
                    <motion.path d={`M ${TR.x} ${TR.y} L ${BL.x} ${BL.y}`} className="stroke-[#D4AF37]" strokeOpacity="0.2" strokeWidth="0.3" />
                </g>

                {/* LAYER 2: NODES */}
                <g>
                    {/* Intermediate Nodes */}
                    <MatrixNode x={TL.x} y={TL.y} value={tlVal} delay={1.4} scale={0.8} />
                    <MatrixNode x={TR.x} y={TR.y} value={trVal} delay={1.5} scale={0.8} />
                    <MatrixNode x={BL.x} y={BL.y} value={blVal} delay={1.6} scale={0.8} />
                    <MatrixNode x={BR.x} y={BR.y} value={brVal} delay={1.7} scale={0.8} />

                    {/* Cardinal Nodes */}
                    <MatrixNode x={TOP.x} y={TOP.y} value={TOP.val} subLabel={TOP.label} delay={1.0} scale={1.2} />
                    <MatrixNode x={RIGHT.x} y={RIGHT.y} value={RIGHT.val} subLabel={RIGHT.label} delay={1.1} scale={1.2} />
                    <MatrixNode x={BOTTOM.x} y={BOTTOM.y} value={BOTTOM.val} subLabel={BOTTOM.label} delay={1.2} scale={1.2} />
                    <MatrixNode x={LEFT.x} y={LEFT.y} value={LEFT.val} subLabel={LEFT.label} delay={1.3} scale={1.2} />

                    {/* Center */}
                    <MatrixNode
                        x={CENTER.x} y={CENTER.y} value={profile.centerNumber} subLabel="COMFORT" delay={2.0} special={true} scale={1.4}
                    />

                    {/* Channels */}
                    <MatrixNode
                        x={loveNode.x} y={loveNode.y} value={loveNode.val} subLabel={loveNode.label} delay={2.2} icon="heart" scale={1.0}
                    />
                    <MatrixNode
                        x={moneyNode.x} y={moneyNode.y} value={moneyNode.val} subLabel={moneyNode.label} delay={2.3} icon="dollar" scale={1.0}
                    />
                </g>

            </svg>

            {showTitle && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.0 }}
                    className="absolute -bottom-8 w-full text-center"
                >
                    <p className="text-[10px] text-[#D4AF37]/40 tracking-[0.6em] font-serif uppercase">Design Your Reality</p>
                </motion.div>
            )}
        </div>
    );
});

DestinyMatrixChartBase.displayName = "DestinyMatrixChartBase";
export const DestinyMatrixChart = motion(DestinyMatrixChartBase);
