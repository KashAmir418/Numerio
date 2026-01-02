import { calculateNumerology, NumerologyProfile } from './numerology';
import { LIFE_PATH_COMPATIBILITY, CompatibilityReading } from './compatibility_content';
import { CompatibilityResult } from './compatibility_types';
export type { CompatibilityResult };

const DEFAULT_READING: CompatibilityReading = {
    core: {
        title: "The Wild Card",
        dynamic: "This combination is either a disaster or a masterpiece. There is no middle ground. You are off the map.",
        gift: "A connection that forces you to grow up, fast.",
        challenge: "Figuring out who is driving the car.",
        growth: "Surrendering control."
    },
    interaction: {
        description: "Intense bursts of connection followed by confusing silence. You trigger each other's 'stuff' immediately.",
        work: "Stop trying to win the argument."
    },
    truth: {
        description: "You are both secretly afraid the other person is better than you.",
        insight: "Your ego is the only enemy here."
    },
    soulParams: {
        teaching: "To find stability in chaos."
    },
    advice: [
        "Drop the pretense.",
        "Admit when you're scared.",
        "Laugh at the absurdity of it all."
    ],
    viral: {
        roast: "The couple most likely to break up and get back together 4 times in one week.",
        receipt: {
            item1: { label: "Drama Level", value: "Spicy" },
            item2: { label: "Logic", value: "404 Error" },
            item3: { label: "Passion", value: "Unstable" }
        },
        redFlags: [
            "You trigger each other on purpose.",
            "Keeping score of past mistakes.",
            "Thinking love should be 'hard'."
        ],
        greenFlags: [
            "Insane chemistry.",
            "You can't lie to each other.",
            "Shared obsession with growth."
        ]
    },
    deep: {
        communication: {
            personA: "Speaks to be heard, not to understand.",
            personB: "Listens for the flaw, not the feeling."
        },
        triggers: "Being ignored or dismissed. The moment one pulls away, the other panics.",
        intimacy: "Volatile. High highs and low lows. You are addicted to the intensity, not the connection.",
        trajectory: "This is a placeholder for unmapped pairings. But generally? You either do the work or you explode."
    },
    gossip: {
        narrative: "I love you both, but watching you try to coordinate a dinner plan is like watching two cats try to drive a submarine.",
        argumentStyle: "One brings up things from 2018, the other dissociates and plays video games.",
        apologyWho: "{nameA} always apologizes first, but they definitely don't mean it."
    }
};

// Helper: Get Vibe Label and Description based on Score and Pairing
const getVibeInfo = (total: number, lpA: number, lpB: number) => {
    if (total >= 95) return { label: "Twin Flames", vibe: "Ethereal" };
    if (total >= 88) return { label: "Power Couple", vibe: "Dynamic" };
    if (total >= 80) return { label: "Soul Mates", vibe: "Harmonious" };
    if (total >= 70) return { label: "Safe Haven", vibe: "Stable" };

    // Specific spicy pairings
    if ((lpA === 4 && lpB === 5) || (lpA === 5 && lpB === 4)) return { label: "Chaos & Order", vibe: "Volatile" };
    if ((lpA === 1 && lpB === 1) || (lpA === 8 && lpB === 8)) return { label: "Ego Collision", vibe: "Critical" };

    if (total <= 30) return { label: "Toxic Magnetism", vibe: "Dangerous" };
    if (total <= 45) return { label: "Growth Catalyst", vibe: "Challenging" };
    if (total <= 60) return { label: "Mirror Work", vibe: "Reflective" };

    return { label: "Cosmic Balance", vibe: "Neutral" };
};

// Helper: Calculate granular scores based on multi-variate numerology
const calculateScores = (profileA: NumerologyProfile, profileB: NumerologyProfile) => {
    const lpA = profileA.lifePathNumber;
    const lpB = profileB.lifePathNumber;
    // const attA = profileA.attitudeNumber; // Unused
    // const attB = profileB.attitudeNumber; // Unused
    const matA = profileA.centerNumber;
    const matB = profileB.centerNumber;

    // Parse Raw Data for Deep Analysis
    const [, mA, dA] = profileA.dob.split('-').map(Number);
    const [, mB, dB] = profileB.dob.split('-').map(Number);

    // 1. Life Path Compatibility (The Road) - 40% Weight
    // Friends/Enemies matrices (Vedic/Chaldean Hybrid)
    const FRIENDLY: Record<number, number[]> = {
        1: [1, 2, 3, 5, 9], 2: [1, 2, 3, 4, 8, 9], 3: [1, 2, 3, 5, 6, 9],
        4: [2, 4, 5, 6, 8], 5: [1, 3, 5, 6, 7], 6: [2, 3, 4, 6, 8, 9],
        7: [1, 4, 5, 7], 8: [2, 4, 6, 8], 9: [1, 2, 3, 6, 9],
        11: [2, 6, 8, 11], 22: [4, 8, 22], 33: [6, 3, 33]
    };

    // Reduce LPs for table lookup if master number not in table (fallback)
    const rLpA = reduceNumber(lpA);
    const rLpB = reduceNumber(lpB);

    let lpScore = 50;
    if (FRIENDLY[rLpA]?.includes(rLpB)) lpScore = 90;
    else if (lpA === lpB) lpScore = 80; // Same path is good but intense
    else lpScore = 30; // Challenge

    // 2. Birth Day (Psychic Number) Compatibility (The Driver) - 30% Weight
    // This governs day-to-day personality/ego.
    const rDayA = reduceNumber(dA);
    const rDayB = reduceNumber(dB);
    let dayScore = 50;
    if (FRIENDLY[rDayA]?.includes(rDayB)) dayScore = 95;
    else if (rDayA === rDayB) dayScore = 85;
    else dayScore = 40;

    // 3. Month Compatibility (The Season) - 10% Weight
    // Seasonal harmony. 
    // Fire/Air/Earth/Water concept mapped to months roughly? 
    // Let's use simple Numerology of the month.
    const rMonthA = reduceNumber(mA);
    const rMonthB = reduceNumber(mB);
    let monthScore = 50;
    // Harmony of 3s (1, 5, 7 - Mind), (2, 4, 8 - Business), (3, 6, 9 - Art/Emotion)
    const groups = [
        [1, 5, 7], [2, 4, 8], [3, 6, 9]
    ];
    let groupMatch = false;
    groups.forEach(g => {
        if (g.includes(rMonthA) && g.includes(rMonthB)) groupMatch = true;
    });
    if (groupMatch) monthScore = 90;
    else if (Math.abs(rMonthA - rMonthB) === 6) monthScore = 80; // Opposite seasons attract
    else monthScore = 60;

    // 4. Matrix Center (The Soul) - 20% Weight
    let soulScore = 50;
    if (matA === matB) soulScore = 100;
    else if ((matA + matB) === 22) soulScore = 95; // 22 Connection
    else if ((matA + matB) === 9 || (matA + matB) === 18) soulScore = 85;
    else soulScore = 60;

    // Weighted Average
    let rawTotal = (lpScore * 0.4) + (dayScore * 0.3) + (monthScore * 0.1) + (soulScore * 0.2);

    // 5. The Chaos Variable (Viral Factor)
    // Ensures that a LP 1 born on the 10th has different score than LP 1 born on 19th paired with same person.
    // Uses a hash of the raw dates to introduce "Fated Variance"
    const chaosHash = ((dA * 13 + mA * 7) + (dB * 11 + mB * 3)) % 13; // 0-12
    const chaosMod = chaosHash - 6; // -6 to +6 variance

    rawTotal += chaosMod;

    // 6. Karmic Debt Checks (The "Heavy" Numbers)
    // 13, 14, 16, 19 in Day of Birth
    const karmicA = [13, 14, 16, 19].includes(dA);
    const karmicB = [13, 14, 16, 19].includes(dB);

    // If both have karmic debt, they bond over trauma/growth -> Higher Soul Score, Lower Ease
    if (karmicA && karmicB) {
        rawTotal += 5; // Trauma Bond bonus
    }

    // Cap and Floor
    const clamp = (n: number) => Math.min(100, Math.max(0, Math.round(n)));
    const finalTotal = clamp(rawTotal);

    // Score Categories
    const mental = clamp(lpScore + (chaosMod * 2));
    const emotional = clamp(dayScore + (groupMatch ? 15 : 0));
    const physical = clamp(monthScore + (lpA === 8 || lpB === 8 ? 20 : 0)); // 8 boosts physical
    const soul = clamp(soulScore + (karmicA || karmicB ? 10 : 0));

    const { label, vibe } = getVibeInfo(finalTotal, lpA, lpB);

    return {
        mental,
        emotional,
        physical,
        soul,
        total: finalTotal,
        label,
        vibe
    };
};

// Helper: Calculate Lust, Logic, and Toxic scores based on deep planetary data
// Helper: Calculate Lust, Logic, and Toxic scores based on deep planetary data
const calculateViralBreakdown = (profileA: NumerologyProfile, profileB: NumerologyProfile) => {
    const lpA = profileA.lifePathNumber;
    const lpB = profileB.lifePathNumber;

    // Parse Dates for Planetary Influence
    const [, mA, dA] = profileA.dob.split('-').map(Number);
    const [, mB, dB] = profileB.dob.split('-').map(Number);

    const rDayA = reduceNumber(dA);
    const rDayB = reduceNumber(dB);
    const rMonthA = reduceNumber(mA);
    const rMonthB = reduceNumber(mB);

    // 1. LUST (Mars/Venus/Pluto Influence)
    // High Lust: 5 (Mercury/Change), 6 (Venus/Love), 8 (Saturn/Intensity), 9 (Mars/Passion)
    const lustNumbers = [5, 6, 8, 9, 11];
    let lust = 40;

    // Day Logic (Immediate attraction)
    if (lustNumbers.includes(rDayA) || lustNumbers.includes(rDayB)) lust += 20;
    if ((rDayA === 6 && rDayB === 9) || (rDayA === 9 && rDayB === 6)) lust += 40; // Venus + Mars = 🔥

    // Life Path Logic (Deep drive)
    if ([1, 5, 8].includes(lpA) && [1, 5, 8].includes(lpB)) lust += 25; // Power couple lust

    // Month Logic (Season)
    if (Math.abs(rMonthA - rMonthB) === 5) lust += 15; // Quincunx energy (astrology approx)

    lust = Math.min(99, Math.max(10, lust));

    // 2. LOGIC (Mercury/Saturn/Jupiter)
    // High Logic: 1 (Sun), 4 (Rahu/Structure), 7 (Ketu/DeepThought), 8 (Saturn)
    const logicNumbers = [1, 4, 7, 8];
    let logic = 30;

    if (logicNumbers.includes(rDayA) && logicNumbers.includes(rDayB)) logic += 40;
    if (lpA === lpB) logic += 20; // Understanding
    if ([3, 5].includes(rDayA) || [3, 5].includes(rDayB)) logic -= 10; // 3 & 5 are chaotic

    logic = Math.min(99, Math.max(5, logic));

    // 3. TOXIC (Pluto/Rahu/Ketu/Mars)
    // High Toxic: Karmic numbers, specific clashes (4 vs 5)
    let toxic = 15;

    // Karmic Debt Dates (13, 14, 16, 19)
    const karmicDays = [13, 14, 16, 19];
    if (karmicDays.includes(dA)) toxic += 15;
    if (karmicDays.includes(dB)) toxic += 15;

    // The "Fatal" Pairs
    if ((lpA === 4 && lpB === 5) || (lpA === 5 && lpB === 4)) toxic += 50;
    if ((lpA === 1 && lpB === 8) || (lpA === 8 && lpB === 1)) toxic += 40;
    if ((lpA === 2 && lpB === 7) || (lpA === 7 && lpB === 2)) toxic += 25; // Cold war

    // Twin Flame Burnout (Same Numbers)
    if (rDayA === rDayB && rMonthA === rMonthB) toxic += 30; // Too similar

    toxic = Math.min(99, Math.max(5, toxic));

    // 4. Insight Generation
    let insight = "You are a cosmic mystery.";
    if (lust > 85 && logic < 35) {
        insight = "This isn't a relationship, it's a dopamine addiction. Enjoy the high, but don't sign a lease.";
    } else if (toxic > 80 && lust > 70) {
        insight = "A beautiful trainwreck. You will likely ruin each other, but the sex will be legendary.";
    } else if (logic > 85 && lust < 40) {
        insight = "The Merger. You run this relationship like a Fortune 500 company. Efficient, profitable, and completely devoid of soul.";
    } else if (toxic > 70 && logic < 30) {
        insight = "This is a karmic trap. You act like you hate each other because deep down, you're terrified of being seen.";
    } else if (lust > 75 && logic > 75) {
        insight = "The Unicorn. Disgustingly compatible. Even the algorithm is jealous.";
    }

    return { lust, logic, toxic, insight };
};

// Helper: Generate Gossip bits if not explicitly defined
const generateGossip = (lpA: number, lpB: number) => {
    // Argument Styles
    const argStyles = [
        "One brings up things from 2018, the other dissociates and plays video games.",
        "A lot of 'I'm fine' while slamming cabinets as loud as possible.",
        "PowerPoint presentations on why the other person is wrong.",
        "One cries, the other apologizes just to make the crying stop.",
        "Total silence for three days followed by a 2 AM text essay."
    ];

    // Apology Logic
    const apologyBits = [
        "Person A, but they definitely don't mean it.",
        "Neither. You both just wait until you forget why you were mad.",
        "Person B, because they hate the silence more than they hate being wrong.",
        "The cat. Usually after knocked over a glass to break the tension.",
        "Whoever gets hungry first."
    ];

    const narrativeBits = [
        "Watching you two is like watching a slow-motion car crash where both drivers are laughing.",
        "I love you both, but your relationship is the reason I increased my therapy sessions.",
        "You are either the best couple I know or the reason I have trust issues. No in-between.",
        "It's giving 'Bonnie and Clyde' if they also argued about whose turn it is to do the dishes."
    ];

    // Deterministic selection based on LP numbers
    const idx1 = (lpA + lpB) % argStyles.length;
    const idx2 = (lpA * lpB) % apologyBits.length;
    const idx3 = (lpA + lpB * 2) % narrativeBits.length;

    return {
        argumentStyle: argStyles[idx1],
        apologyWho: apologyBits[idx2],
        narrative: narrativeBits[idx3]
    };
};

// Helper: Reduce number to 1-9
const reduceNumber = (n: number): number => {
    let sum = n;
    while (sum > 9) {
        sum = String(sum).split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return sum;
};

// Helper: Get Birth Day Synergy
const getBirthDaySynergy = (dayA: number, dayB: number) => {
    const a = reduceNumber(dayA);
    const b = reduceNumber(dayB);

    if (a === b) {
        return { text: "Mirror Energy. You likely share key personality traits and react to stress in similar ways.", score: 90 };
    }

    // Natural Groups
    const mental = [1, 5, 7];
    // Check Groups
    const creative = [3, 6, 9];
    const practical = [4, 8];
    const emotional = [2, 6, 9];
    const bothMental = mental.includes(a) && mental.includes(b);
    const bothCreative = creative.includes(a) && creative.includes(b);
    const bothPractical = practical.includes(a) && practical.includes(b);
    const bothEmotional = emotional.includes(a) && emotional.includes(b);

    if (bothMental) return { text: "Intellectual Connection. You connect through ideas and conversation.", score: 85 };
    if (bothCreative) return { text: "Creative Spark. You inspire each other's expression.", score: 85 };
    if (bothPractical) return { text: "Building Block. You can effectively manage life's details together.", score: 85 };
    if (bothEmotional) return { text: "Heart Centered. You share a deep emotional understanding.", score: 90 };

    // Complementary Odd/Even usually works well in Numerology too, but let's look for specific friction
    // 4 vs 5 (Order vs Chaos)
    if (a === 4 && b === 5) return { text: "Order vs. Chaos. One organizes the sock drawer, the other sets it on fire.", score: 40 };
    if (a === 5 && b === 4) return { text: "Chaos vs. Order. One organizes the sock drawer, the other sets it on fire.", score: 40 };

    // 1 vs 9 (Self vs All)
    if ((a === 1 && b === 9) || (a === 9 && b === 1)) return { text: "The Narcissist vs. The Martyr. A classic, tragic pairing.", score: 60 };

    // Default
    return { text: "Stranger Danger. You have almost nothing in common. Good luck.", score: 70 };
};

// Helper: Get Personal Year Timing
const getTimingInsight = (pyA: number, pyB: number) => {
    const diff = Math.abs(pyA - pyB);

    if (pyA === pyB) return { text: "Aligned Timing. You are facing the same energetic themes this year.", challenge: false };

    if (diff === 1 || diff === 8) { // 1 & 2, or 1 & 9
        // 1 & 9 is the handoff
        if ((pyA === 1 && pyB === 9) || (pyA === 9 && pyB === 1)) return { text: "Transition Timing. One is beginning a new cycle while the other is ending one. Patience is required.", challenge: true };
        return { text: "Supportive Timing. You are one step apart, allowing one to guide or support the other.", challenge: false };
    }

    if ((pyA === 4 && pyB === 5) || (pyA === 5 && pyB === 4)) {
        return { text: "Contrasting Timing. One year demands work/stability (4), the other demands change/freedom (5). Conflict possible.", challenge: true };
    }

    if ((pyA === 7 && pyB === 8) || (pyA === 8 && pyB === 7)) {
        return { text: "Inner vs. Outer. One reflects (7), the other achieves (8). Don't judge the other's pace.", challenge: true };
    }

    return { text: "Complementary Cycles. You are in different phases, offering a broader perspective on life.", challenge: false };
};

// Helper: Get Attitude Insight (The Surface/First Impression)
const getAttitudeInsight = (attA: number, attB: number) => {
    const a = reduceNumber(attA);
    const b = reduceNumber(attB);

    if (a === b) {
        return { text: "Narcissus Effect. You are dating yourself. It's safe, but zero growth.", score: 95 };
    }

    // Friendly Groups
    const mind = [1, 5, 7];
    const feeling = [2, 3, 6, 9];
    const structure = [4, 8];

    // Check matches
    if (mind.includes(a) && mind.includes(b)) return { text: "Mental Sync. You both default to logic and strategy when things get tough.", score: 85 };
    if (feeling.includes(a) && feeling.includes(b)) return { text: "Emotional Flow. You naturally empathize with each other's reactions.", score: 85 };
    if (structure.includes(a) && structure.includes(b)) return { text: "Power Stance. You both command respect and demand results.", score: 85 };

    // Frictions
    if ((mind.includes(a) && feeling.includes(b)) || (feeling.includes(a) && mind.includes(b))) {
        return { text: "The Alien Gap. One speaks logic, the other speaks crying. Good luck translating.", score: 50 };
    }

    return { text: "Oil and Water. You don't mix, you just sit next to each other.", score: 65 };
};

// Helper: Generate dynamic, numerology-backed Signal Check (Flags)
const generateSignalCheck = (
    lpA: number,
    lpB: number,
    attA: number,
    attB: number,
    totalScore: number,
    viralBreakdown: { lust: number; logic: number; toxic: number },
    existingReading: { greenFlags: string[]; redFlags: string[] }
) => {
    // 1. Define Traits for specific numbers to generate personalized flags
    const numberTraits: Record<number, { positive: string; negative: string }> = {
        1: { positive: "drive and ambition", negative: "stubborn ego" },
        2: { positive: "emotional depth", negative: "passive aggression" },
        3: { positive: "creative spark", negative: "scattered focus" },
        4: { positive: "grounded stability", negative: "rigid control" },
        5: { positive: "love for freedom", negative: "unpredictable chaos" },
        6: { positive: "nurturing care", negative: "suffocating perfectionism" },
        7: { positive: "intellectual depth", negative: "emotional withdrawal" },
        8: { positive: "power to manifest", negative: "material obsession" },
        9: { positive: "universal wisdom", negative: "martyr complex" },
        11: { positive: "psychic intuition", negative: "nervous tension" },
        22: { positive: "master building", negative: "crippling pressure" },
        33: { positive: "compassionate service", negative: "boundary issues" }
    };

    const redFlags: string[] = [];
    const greenFlags: string[] = [];

    // Helper to add unique flags
    const addRed = (text: string) => { if (!redFlags.includes(text)) redFlags.push(text); };
    const addGreen = (text: string) => { if (!greenFlags.includes(text)) greenFlags.push(text); };

    // 2. Logic-Based Generation: DEEP Numerology

    // --- Life Path Dynamics ---
    if (lpA === lpB) {
        // Master Numbers get special treatment
        if (lpA >= 11) {
            addGreen(`High frequency resonance (Double ${lpA}).`);
            addRed(`Intense pressure cooker dynamic.`);
        } else {
            addGreen(`Shared ${numberTraits[lpA]?.positive || "vibration"}.`);
            addRed(`Double the ${numberTraits[lpA]?.negative || "trouble"}.`);
        }
    } else {
        // Specific frictions
        // Freedom (5) vs Structure (4)
        if ((lpA === 4 && lpB === 5) || (lpA === 5 && lpB === 4)) {
            addRed("Fundamental clash: Freedom vs. Order.");
        }
        // Ego (1) vs Power (8)
        if ((lpA === 1 && lpB === 8) || (lpA === 8 && lpB === 1)) {
            addRed("Power struggle: Two captains, one ship.");
            addGreen("Unstoppable empire building potential.");
        }
        // Heart (2) vs Mind (7)
        if ((lpA === 2 && lpB === 7) || (lpA === 7 && lpB === 2)) {
            addRed("Heart vs. Head disconnect.");
            addGreen("Deep spiritual and emotional balance potential.");
        }
        // Expression (3) vs Detail (4)
        if ((lpA === 3 && lpB === 4) || (lpA === 4 && lpB === 3)) {
            addRed("Artist vs. Manager friction.");
        }
        // Service (6) vs Freedom (5)
        if ((lpA === 6 && lpB === 5) || (lpA === 5 && lpB === 6)) {
            addRed("Commitment vs. Adventure conflict.");
        }

        // Triad Checks
        const mindTriad = [1, 5, 7];
        const creativeTriad = [3, 6, 9];
        const businessTriad = [2, 4, 8];

        if (mindTriad.includes(lpA) && mindTriad.includes(lpB)) addGreen("Intellectually stimulating connection.");
        if (creativeTriad.includes(lpA) && creativeTriad.includes(lpB)) addGreen("Shared artistic/creative vision.");
        if (businessTriad.includes(lpA) && businessTriad.includes(lpB)) addGreen("Practical goals aligned.");
    }

    // --- Viral Breakdown Specifics ---
    if (viralBreakdown.lust > 92) addRed("Blinded by raw physical chemistry.");
    else if (viralBreakdown.lust > 80) addGreen("Magnetic physical attraction.");

    if (viralBreakdown.toxic > 85) addRed("Addiction to the highs and lows.");
    else if (viralBreakdown.toxic > 60) addRed("Volatile emotional reactions.");

    if (viralBreakdown.logic > 85) addGreen("Excellent communication foundation.");
    else if (viralBreakdown.logic < 30) addRed("Communication breakdown likely.");

    // --- Attitude (Surface) Layer ---
    // If Life Path is compatible but Attitude clashes, it's a "Hidden Red Flag"
    const aEven = reduceNumber(attA) % 2 === 0;
    const bEven = reduceNumber(attB) % 2 === 0;

    if (aEven !== bEven && totalScore < 60) {
        addRed("Different approaches to stress handling.");
    } else if (reduceNumber(attA) === reduceNumber(attB)) {
        addGreen("Instantly comfortable surface dynamic.");
    }

    // 3. Fallback / Fill from Static Content
    // We prioritize our dynamic ones.

    // Balanced Counts Logic:
    // We want a "tilt" and randomness.
    let targetGreen = 0;
    let targetRed = 0;

    // Use a deterministic seed from the score to vary the "Total" count (5 or 6 flags total usually)
    const variance = (totalScore % 2); // 0 or 1

    if (totalScore >= 80) {
        targetGreen = 4 + variance; // 4 or 5
        targetRed = 1 + variance; // 1 or 2
    }
    else if (totalScore >= 65) {
        targetGreen = 3 + variance;
        targetRed = 2;
    }
    else if (totalScore >= 50) {
        // Middle ground - Force a tilt based on toxicity
        if (viralBreakdown.toxic > 50) {
            targetGreen = 2; targetRed = 4;
        } else {
            targetGreen = 4; targetRed = 2;
        }
    }
    else if (totalScore >= 35) {
        targetGreen = 2;
        targetRed = 3 + variance;
    }
    else {
        targetGreen = 1;
        targetRed = 4 + variance;
    }

    // Cap at reasonable limits
    targetGreen = Math.min(6, Math.max(1, targetGreen));
    targetRed = Math.min(6, Math.max(1, targetRed));

    // Fill Green
    let i = 0;
    while (greenFlags.length < targetGreen && existingReading.greenFlags[i]) {
        addGreen(existingReading.greenFlags[i]);
        i++;
    }

    // Fill Red
    let j = 0;
    while (redFlags.length < targetRed && existingReading.redFlags[j]) {
        addRed(existingReading.redFlags[j]);
        j++;
    }

    return {
        green: greenFlags.slice(0, targetGreen),
        red: redFlags.slice(0, targetRed)
    };
};

// Helper: Calculate Breakup Probability & Insights
const calculateBreakupChance = (
    totalScore: number,
    viralBreakdown: { lust: number; logic: number; toxic: number },
    flags: { green: string[]; red: string[] }
) => {
    // Base chance is inverse of compatibility, but heavily weighted by toxicity
    let chance = 100 - totalScore;

    // Toxicity Multiplier: High Toxicity drastically increases breakup risk (instability)
    if (viralBreakdown.toxic > 80) chance += 20;
    else if (viralBreakdown.toxic > 60) chance += 10;

    // Lust vs Logic Imbalance: High Lust / Low Logic = Burnout Risk
    if (viralBreakdown.lust > 80 && viralBreakdown.logic < 40) chance += 15;

    // Cap at 99% (nothing is certain) and floor at 1%
    chance = Math.min(99, Math.max(1, chance));

    // Determine Risk Level
    let riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical' = 'Low';
    if (chance > 85) riskLevel = 'Critical';
    else if (chance > 65) riskLevel = 'High';
    else if (chance > 35) riskLevel = 'Moderate';

    // Generate Insights (The "Scary" Part)
    // We map technical flags to "Breakup Reasons"
    const insights: string[] = [];

    // 1. The "Why" based on Red Flags
    if (flags.red.length > 0) {
        // Take the top 2 red flags and rephrase them as "End Game" scenarios
        flags.red.slice(0, 2).forEach(flag => {
            if (flag.includes("Ego") || flag.includes("Power")) insights.push("Power struggles will eventually exhaust the romance.");
            else if (flag.includes("Freedom") || flag.includes("Order")) insights.push("One will eventually feel suffocated, the other chaotic.");
            else if (flag.includes("Communication")) insights.push("Silence will become the loudest thing in the room.");
            else if (flag.includes("Passive")) insights.push("Resentment will build quietly until it explodes.");
            else if (flag.includes("Control")) insights.push("The need for control will kill the intimacy.");
            else insights.push(`Unresolved friction: ${flag}`);
        });
    }

    // 2. The "When" / "How" based on Viral Stats
    if (viralBreakdown.lust > 90 && viralBreakdown.logic < 30) {
        insights.push("It ends when the physical spark fades and you realize you have nothing to talk about.");
    } else if (viralBreakdown.toxic > 85) {
        insights.push("It ends in a blaze of glory. A massive fight that neither of you can come back from.");
    } else if (viralBreakdown.logic > 90 && viralBreakdown.lust < 30) {
        insights.push("It doesn't end with a bang, but a whimper. You drift apart into being 'just roommates'.");
    }

    // Fallback
    if (insights.length === 0) {
        insights.push("Natural drift due to evolving life paths.");
    }

    return { chance, riskLevel, insights };
};

// Helper: Calculate Fight Matrix (The Conflict Protocol)
const calculateFightMatrix = (lpA: number, lpB: number) => {
    // 1. Define Fight Profiles
    const FIGHT_PROFILES: Record<number, { style: string; weapon: string; aggression: number; volatility: number; recovery: number }> = {
        1: { style: "The Commander", weapon: "Blunt Force Commands", aggression: 90, volatility: 70, recovery: 80 }, // Fast to anger, fast to fix if they win
        2: { style: "The Silencer", weapon: "Weaponized Tears / Guilt", aggression: 20, volatility: 40, recovery: 50 }, // Slow, emotional
        3: { style: "The Lawyer", weapon: "Sarcasm & Old History", aggression: 60, volatility: 80, recovery: 90 }, // Explosive but quick to forgive
        4: { style: "The Wall", weapon: "Refusal to Budge", aggression: 50, volatility: 20, recovery: 10 }, // Never forgets
        5: { style: "The Runner", weapon: "Ghosting / Leaving Mid-Argument", aggression: 70, volatility: 90, recovery: 70 }, // Chaotic
        6: { style: "The Martyr", weapon: "Moral Superiority", aggression: 40, volatility: 50, recovery: 60 }, // "I do everything for you"
        7: { style: "The Iceberg", weapon: "Intellectual Condescension", aggression: 30, volatility: 10, recovery: 30 }, // Cold
        8: { style: "The Dictator", weapon: "Financial/Emotional Ultimatums", aggression: 100, volatility: 80, recovery: 60 }, // Nuclear
        9: { style: "The Judge", weapon: "Silent Disappointment", aggression: 40, volatility: 40, recovery: 40 }, // Preachy
        11: { style: "The Psychic", weapon: "Reading Your Mind (Wrongly)", aggression: 60, volatility: 90, recovery: 50 },
        22: { style: "The Architect", weapon: "Systematic Deconstruction of Your Ego", aggression: 80, volatility: 50, recovery: 20 },
        33: { style: "The Saint", weapon: "Killing You With Kindness (Fake)", aggression: 30, volatility: 60, recovery: 70 }
    };

    const pA = FIGHT_PROFILES[lpA] || FIGHT_PROFILES[reduceNumber(lpA)];
    const pB = FIGHT_PROFILES[lpB] || FIGHT_PROFILES[reduceNumber(lpB)];

    if (!pA || !pB) return undefined;

    // 2. Determine Instigator (Who starts it?)
    let instigator: 'A' | 'B' | 'Both' = 'Both';
    if (Math.abs(pA.aggression - pB.aggression) > 20) {
        instigator = pA.aggression > pB.aggression ? 'A' : 'B';
    }

    // 3. Determine Intensity
    const avgVol = (pA.volatility + pB.volatility) / 2;
    let intensity: 'Cold War' | 'Heated Debate' | 'Nuclear' | 'Passive-Aggressive' = 'Heated Debate';

    // Check for Cold War (Low aggression/volatility)
    if (pA.aggression < 40 && pB.aggression < 40) intensity = 'Passive-Aggressive';
    else if (pA.style.includes("Iceberg") || pB.style.includes("Iceberg")) intensity = 'Cold War';
    else if (avgVol > 75) intensity = 'Nuclear';

    // 4. Generate "Style" Title
    let styleTitle = `${pA.style} vs ${pB.style}`;
    if (lpA === lpB) styleTitle = "Mirror Match: The Echo Chamber";
    else if ((lpA === 1 && lpB === 8) || (lpA === 8 && lpB === 1)) styleTitle = "Clash of Titans: The Power Struggle";
    else if ((lpA === 4 && lpB === 5) || (lpA === 5 && lpB === 4)) styleTitle = "Order vs Chaos: The Eternal War";
    else if ((lpA === 2 && lpB === 7) || (lpA === 7 && lpB === 2)) styleTitle = "Fire & Ice: The Communication Gap";

    // 5. Resolution & Recovery
    let resolution = "Mutual exhaustion.";
    if (pA.recovery > pB.recovery + 30) resolution = "Person A apologizes first just to move on.";
    else if (pB.recovery > pA.recovery + 30) resolution = "Person B apologizes first just to move on.";
    else if (pA.recovery < 30 && pB.recovery < 30) resolution = "Nobody apologizes. You just drift back together.";
    else if (instigator === 'A') resolution = "A starts it, but B ends it.";
    else if (instigator === 'B') resolution = "B starts it, but A ends it.";

    // 6. Timeline
    const slowerRecovery = Math.min(pA.recovery, pB.recovery);
    let timeline = "20 minutes";
    if (slowerRecovery < 20) timeline = "3-5 Business Days"; // Grudge holders (4, 7, 22)
    else if (slowerRecovery < 40) timeline = "24 Hours (Sleep on it)";
    else if (slowerRecovery < 60) timeline = "2 Hours max";
    else timeline = "15 minutes (or until hungry)";

    return {
        instigator,
        intensity,
        style: styleTitle,
        personA_weapon: pA.weapon,
        personB_weapon: pB.weapon,
        likely_resolution: resolution,
        aftermath_timeline: timeline
    };
};

export const calculateCompatibility = (dateA: string, dateB: string, nameA: string = "Person A", nameB: string = "Person B"): CompatibilityResult => {
    // 1. Calculate profiles
    const profileA = calculateNumerology(dateA);
    const profileB = calculateNumerology(dateB);

    const lpA = profileA.lifePathNumber;
    const lpB = profileB.lifePathNumber;

    // 2. Get Reading (Handle Symmetry)
    let reading = JSON.parse(JSON.stringify(DEFAULT_READING)); // Deep copy to avoid mutating reference

    // Try lookup A -> B
    if (LIFE_PATH_COMPATIBILITY[lpA] && LIFE_PATH_COMPATIBILITY[lpA][lpB]) {
        reading = JSON.parse(JSON.stringify(LIFE_PATH_COMPATIBILITY[lpA][lpB]));
    }
    // Try lookup B -> A
    else if (LIFE_PATH_COMPATIBILITY[lpB] && LIFE_PATH_COMPATIBILITY[lpB][lpA]) {
        reading = JSON.parse(JSON.stringify(LIFE_PATH_COMPATIBILITY[lpB][lpA]));
    }

    // Helper to replace names
    const replaceNames = (text: string) => {
        if (!text) return "";
        return text.replace(/Person A/g, nameA)
            .replace(/Person B/g, nameB)
            .replace(/{nameA}/g, nameA)
            .replace(/{nameB}/g, nameB);
    };

    // Replace in generic fields
    if (reading.gossip) {
        reading.gossip.apologyWho = replaceNames(reading.gossip.apologyWho);
        reading.gossip.argumentStyle = replaceNames(reading.gossip.argumentStyle);
        reading.gossip.narrative = replaceNames(reading.gossip.narrative);
    }
    if (reading.deep?.communication) {
        reading.deep.communication.personA = replaceNames(reading.deep.communication.personA);
        reading.deep.communication.personB = replaceNames(reading.deep.communication.personB);
    }

    // 3. Calculate Scores
    const scores = calculateScores(profileA, profileB);

    // 4. Calculate New Metrics
    const synergy = getBirthDaySynergy(profileA.birthDayNumber, profileB.birthDayNumber);
    const timing = getTimingInsight(profileA.forecast.personalYear, profileB.forecast.personalYear);
    const attitude = getAttitudeInsight(profileA.attitudeNumber, profileB.attitudeNumber);

    // PASS PROFILES instead of just LP to breakdown
    const viralBreakdown = calculateViralBreakdown(profileA, profileB);

    // 5. Inject Gossip if missing
    if (!reading.gossip) {
        reading.gossip = generateGossip(lpA, lpB);
        // Replace names in generated gossip
        reading.gossip.apologyWho = replaceNames(reading.gossip.apologyWho);
        reading.gossip.argumentStyle = replaceNames(reading.gossip.argumentStyle);
        reading.gossip.narrative = replaceNames(reading.gossip.narrative);
    }

    // 6. Generate Dynamic Signal Check (Flags)
    // This replaces the static flags with our weighted, personalized list
    const dynamicFlags = generateSignalCheck(
        lpA,
        lpB,
        profileA.attitudeNumber,
        profileB.attitudeNumber,
        scores.total,
        viralBreakdown,
        reading.viral || { greenFlags: [], redFlags: [] }
    );

    if (reading.viral) {
        reading.viral.greenFlags = dynamicFlags.green;
        reading.viral.redFlags = dynamicFlags.red;
    }

    // 7. Calculate Breakup Analysis
    const breakupPrediction = calculateBreakupChance(scores.total, viralBreakdown, dynamicFlags);

    // 8. Calculate Fight Matrix (and inject names)
    const fightMatrix = calculateFightMatrix(lpA, lpB);
    if (fightMatrix) {
        fightMatrix.likely_resolution = replaceNames(fightMatrix.likely_resolution);
    }

    return {
        personA: {
            date: dateA,
            lifePath: lpA,
            personalYear: profileA.forecast.personalYear,
            birthDayNumber: profileA.birthDayNumber
        },
        personB: {
            date: dateB,
            lifePath: lpB,
            personalYear: profileB.forecast.personalYear,
            birthDayNumber: profileB.birthDayNumber
        },
        compatibility: reading,
        synergy: synergy,
        timing: timing,
        attitude: attitude,
        scores: scores,
        viralBreakdown: viralBreakdown,
        breakupPrediction: breakupPrediction,
        conflict_matrix: fightMatrix
    };
};
