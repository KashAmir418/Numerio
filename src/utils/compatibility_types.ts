
import { CompatibilityReading } from './compatibility_content';

export interface CompatibilityResult {
    personA: {
        date: string;
        lifePath: number;
        personalYear: number;
        birthDayNumber: number;
    };
    personB: {
        date: string;
        lifePath: number;
        personalYear: number;
        birthDayNumber: number;
    };
    compatibility: CompatibilityReading;
    synergy: {
        text: string;
        score: number;
    };
    timing: {
        text: string;
        challenge: boolean;
    };
    attitude: {
        text: string;
        score: number;
    };
    scores: {
        total: number;
        emotional: number;
        mental: number;
        physical: number;
        soul: number;
        label: string;
        vibe: string;
    };
    viralBreakdown?: {
        lust: number;
        logic: number;
        toxic: number;
        insight: string;
    };
    breakupPrediction?: {
        chance: number; // 0-100%
        riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
        insights: string[]; // "Why it might end"
    };
    conflict_matrix?: {
        instigator: 'A' | 'B' | 'Both'; // Who starts it
        intensity: 'Cold War' | 'Heated Debate' | 'Nuclear' | 'Passive-Aggressive';
        style: string; // catchy title like "The Silent Treatment vs The Shouting Match"
        personA_weapon: string; // e.g., "Logic Bombs"
        personB_weapon: string; // e.g., "Emotional Guilt"
        likely_resolution: string; // "A apologizes first"
        aftermath_timeline: string; // "2 hours" vs "3 days"
    };
}
