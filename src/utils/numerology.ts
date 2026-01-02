/**
 * Numerology Calculation Utilities
 */

/**
 * Calculates the sum of digits recursively until a single digit (or master number) is reached,
 * or just the sum for specific matrix positions.
 * For Life Path, we typically reduce to single digit unless 11, 22, 33.
 */

// Helper to sum digits of a number
const sumDigits = (n: number): number => {
    return n.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
};

// Reduce to single digit, preserving Master Numbers 11, 22, 33 if specified
const reduceNumber = (n: number, preserveMasterBytes: boolean = true): number => {
    if (n === 0) return 0;

    let current = n;
    while (current > 9) {
        if (preserveMasterBytes && (current === 11 || current === 22 || current === 33)) {
            return current;
        }
        current = sumDigits(current);
    }
    return current;
};

// Specifically for Destiny Matrix, numbers strictly > 22 are summed.
// 22 is kept. 
// Rules vary, but standard matrix usually calculates modulo 22 or sum digits if > 22.
// Common Arcana method: if n > 22, sum digits. if still > 22, sum again.
const reduceForMatrix = (n: number): number => {
    let current = n;
    while (current > 22) {
        current = sumDigits(current);
    }
    return current;
};

export interface NumerologyProfile {
    dob: string; // YYYY-MM-DD
    lifePathNumber: number;
    birthDayNumber: number; // A: Day (Matrix)
    birthMonthNumber: number; // B: Month (Matrix)
    birthYearNumber: number; // C: Year (Matrix)
    centerNumber: number; // Center of Matrix usually (A+B+C+D)
    lowerAnchor: number; // D: A + B + C = D (Matrix)

    // Extended Numerology
    attitudeNumber: number;
    challenges: {
        c1: number;
        c2: number;
        c3: number;
    };
    pinnacles: {
        p1: number;
        p2: number;
        p3: number;
        p4: number;
        p1Age: number;
        p2AgeEnd: number;
        p3AgeEnd: number;
    };
    forecast: {
        personalYear: number;
        personalMonth: number;
        personalDay: number;
        universalDay: number;
    };
    matrixExtras?: {
        skyLine: number;
        earthLine: number;
        maleLine: number;
        femaleLine: number;
        spiritGuide: number;
        love: number;
        money: number;
    };
}

export const calculateUniversalDay = (): number => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    // Universal Day = Reduced(Day + Month + Reduced(Year))
    return reduceNumber(reduceNumber(day) + reduceNumber(month) + reduceNumber(year));
};

export const calculateNumerology = (birthDate: string): NumerologyProfile => {


    // Extract parts (local time to avoid timezone shifts effectively, assuming input string YYYY-MM-DD)
    const [yStr, mStr, dStr] = birthDate.split('-');
    const day = parseInt(dStr, 10);
    const month = parseInt(mStr, 10);
    const year = parseInt(yStr, 10);

    // Life Path Calculation (Standard Western)
    // Method 2 (Sum all digits)
    const fullString = `${day}${month}${year}`;
    const totalSum = fullString.split('').reduce((acc, c) => acc + parseInt(c), 0);
    const lifePathNumber = reduceNumber(totalSum);

    // Destiny Matrix Base Calculations (Arcana 1-22)
    const A = reduceForMatrix(day);
    const B = reduceForMatrix(month);
    const C = reduceForMatrix(sumDigits(year));
    const D = reduceForMatrix(A + B + C);
    const Center = reduceForMatrix(A + B + C + D);

    // --- Extended Numerology ---

    // 1. Attitude Number: Day + Month (Reduced)
    const attitudeNumber = reduceNumber(reduceNumber(day) + reduceNumber(month));

    // 2. Challenges (Usually using reduced Day/Month/Year single digits)
    const reducedDay = reduceNumber(day);
    const reducedMonth = reduceNumber(month);
    const reducedYear = reduceNumber(year);

    const c1 = Math.abs(reducedMonth - reducedDay); // Challenge 1
    const c2 = Math.abs(reducedDay - reducedYear); // Challenge 2
    const c3 = Math.abs(c1 - c2); // Challenge 3

    // 3. Pinnacles
    const p1 = reduceNumber(reducedMonth + reducedDay);
    const p2 = reduceNumber(reducedDay + reducedYear);
    const p3 = reduceNumber(p1 + p2);
    const p4 = reduceNumber(reducedMonth + reducedYear);

    // Pinnacle Ages
    const p1Age = 36 - reduceNumber(lifePathNumber, false); // Life path reduced to single digit for this calc usually
    const p2AgeEnd = p1Age + 9;
    const p3AgeEnd = p2AgeEnd + 9;

    // 4. Forecast (Current Date)
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    const personalYear = reduceNumber(reducedMonth + reducedDay + reduceNumber(currentYear));
    const personalMonth = reduceNumber(personalYear + currentMonth);
    const personalDay = reduceNumber(personalMonth + currentDay);
    const universalDay = calculateUniversalDay();

    return {
        dob: birthDate,
        lifePathNumber,
        birthDayNumber: A,
        birthMonthNumber: B,
        birthYearNumber: C,
        lowerAnchor: D,
        centerNumber: Center,

        attitudeNumber,
        challenges: { c1, c2, c3 },
        pinnacles: {
            p1, p2, p3, p4,
            p1Age, p2AgeEnd, p3AgeEnd
        },
        forecast: {
            personalYear,
            personalMonth,
            personalDay,
            universalDay
        },
        matrixExtras: {
            skyLine: reduceForMatrix(B + D),
            earthLine: reduceForMatrix(A + C),
            maleLine: reduceForMatrix(A + B + C + D),
            femaleLine: reduceForMatrix(A + B),
            spiritGuide: reduceForMatrix(Center + A + B + C + D),
            love: reduceForMatrix(D + C + Center), // Bottom(D) + Right(C) + Center
            money: reduceForMatrix(B + C + Center) // Top(B) + Right(C) + Center
        }
    };
};

export const getPersonalYearSummary = (year: number): string => {
    const summaries: Record<number, string> = {
        1: "A year of aggressive action and new beginnings. Be bold.",
        2: "A year of patience and hidden growth. Wait for it.",
        3: "A year of visible success and social expansion. Be seen.",
        4: "A year of hard labor and foundation laying. Do the work.",
        5: "A year of chaotic freedom and sudden shifts. Pivot.",
        6: "A year of duty, family, and domestic responsibility. Serve.",
        7: "A year of solitude and deep analysis. Go within.",
        8: "A year of power, money, and karma. Claim your worth.",
        9: "A year of endings and emotional clearing. Let go.",
        11: "A master year of high-voltage intuition. Channel it.",
        22: "A master year of empire building. Think big.",
        33: "A master year of selfless healing. Love all."
    };
    return summaries[year] || "A year of unique vibration.";
};

export const getDayQuality = (dayNumber: number): 'opportunity' | 'caution' | 'neutral' => {
    // Simplified logic: Odd/Dynamic numbers vs Even/Stable numbers?
    // Or specific "Karmic" or "High Energy" days.
    // For this Freemium demo:
    // Opportunity: 1, 3, 5, 8
    // Caution: 4, 7, 9 (sometimes heavy)
    // Neutral: 2, 6
    if ([1, 3, 5, 8, 11, 22].includes(dayNumber)) return 'opportunity';
    if ([4, 7, 9].includes(dayNumber)) return 'caution';
    return 'neutral';
};

export const getDailyAdvice = (dayNumber: number): string => {
    const advice: Record<number, string> = {
        1: "Lead, initiate, or walk away. Passive behavior will be punished today.",
        2: "Silence is your weapon. Listen more than you speak. The truth is in the subtext.",
        3: "Your voice is a spell today. Ask for what you want, and make it entertaining.",
        4: "Do the boring thing. Secure the foundation. The devil is in the details.",
        5: "Say yes to the detour. The plan is dead; long live the adventure.",
        6: "Call your mother. Or your mentor. Connection is the currency of the day.",
        7: "Turn off the phone. Your best idea is hiding in the silence of your own mind.",
        8: "Talk money. Close the deal. Do not apologize for your ambition today.",
        9: "Throw it out. If it's broken, dead, or draining, get rid of it now.",
        11: "Trust the crazy idea. Logic is too slow for today's download.",
        22: "Build. Take one brick and lay it perfectly. Repeat."
    };
    return advice[dayNumber] || "Trust your intuition today.";
};

import { MONTHLY_FORECAST_MATRIX } from "./forecast_content";

export const getMonthlyAdvice = (personalYear: number, personalMonth: number): string => {
    // Safety check for ranges 1-9
    const year = Math.max(1, Math.min(9, personalYear));
    const month = Math.max(1, Math.min(9, personalMonth));

    // Check if matrix instruction exists
    if (MONTHLY_FORECAST_MATRIX[year] && MONTHLY_FORECAST_MATRIX[year][month]) {
        return MONTHLY_FORECAST_MATRIX[year][month];
    }

    // Fallback if something weird happens (like Master Numbers passed in without reduction)
    return "A month of unique potential. Navigate with awareness.";
};




export const getPinnacleAdvice = (pinnacleNumber: number): string => {
    const advice: Record<number, string> = {
        1: "You are entering a cycle of independence. Stand on your own two feet.",
        2: "You are entering a cycle of partnership. detailed attention to detail.",
        4: "You are entering a cycle of foundation building. Hard work pays off.",
        8: "You are entering a 9-year cycle of wealth accumulation. Here is how to prepare.",
        9: "You are entering a cycle of giving back to the world.",
    };
    return advice[pinnacleNumber] || "A powerful cycle of growth awaits.";
};

