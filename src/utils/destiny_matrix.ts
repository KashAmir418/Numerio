/**
 * Utility for calculating the Destiny Matrix (22 Arcana System)
 * Based on the square-within-a-square geometric layout.
 */

export interface MatrixNode {
    id: string;
    label: string;
    description: string;
    value: number;
    category: 'personality' | 'spirit' | 'social' | 'karmic' | 'soul' | 'money' | 'love';
}

export interface DestinyMatrixData {
    nodes: Record<string, MatrixNode>;
    channels: {
        money: number[];
        love: number[];
        karmic: number[];
    };
}

const reduceTo22 = (n: number): number => {
    let result = n;
    while (result > 22) {
        result = result.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    // Specific case for 22 which is an Arcana
    if (n === 22) return 22;
    return result;
};

const getArcanaDescription = (n: number, category: string): string => {
    const descriptions: Record<number, Record<string, string>> = {
        1: { personality: "Leader, pioneer, and creator of your own reality.", money: "Success through unique ideas and individual initiatives.", love: "Passionate but needs personal space and independence." },
        2: { personality: "Intuitive, diplomatic, and balanced observer.", money: "Success through partnerships and advisory roles.", love: "Deep emotional connection and harmony." },
        3: { personality: "Nurturing, creative, and abundant nature.", money: "Prosperity through creation, beauty, or management.", love: "Strong focus on family and emotional growth." },
        4: { personality: "Ordered, disciplined, and authoritative leader.", money: "Wealth built through structure and long-term planning.", love: "Stable and protective partnership." },
        5: { personality: "Teacher, tradition-bearer, and spiritual seeker.", money: "Success through education, law, or traditional systems.", love: "Values loyalty and shared spiritual or moral codes." },
        6: { personality: "Charismatic, loving, and choice-driven soul.", money: "Wealth through hospitality, beauty, or collaborative efforts.", love: "A focus on intense romance and making key life choices." },
        7: { personality: "Winner, traveler, and goal-oriented achiever.", money: "Rapid success through clear goals and movement.", love: "Dynamic relationship that moves toward common aims." },
        8: { personality: "Just, balanced, and understands cause and effect.", money: "Wealth through law, finance, or ethical business.", love: "Fairness and karmic balance in partnership." },
        9: { personality: "Wise, introspective, and deep intellectual.", money: "Success through specialty knowledge or solitary work.", love: "Need for depth and intellectual connection." },
        10: { personality: "Fortunate, adaptable, and flows with life.", money: "Wealth comes in cycles and through 'lucky' opportunities.", love: "Easy-going and destiny-led connections." },
        11: { personality: "Strong, energetic, and physically powerful.", money: "Success through high-intensity work or athletic fields.", love: "High passion and energetic compatibility." },
        12: { personality: "Altruistic, unique perspective, and visionary.", money: "Success through charity, creative arts, or service.", love: "Selfless love but must avoid sacrifice traps." },
        13: { personality: "Transformative, regenerative, and revolutionary.", money: "Wealth built through redesigning or ending the old.", love: "Intense transformation and deep renewal." },
        14: { personality: "Temperate, artistic, and emotionally balanced.", money: "Steady growth through moderation and art.", love: "Peaceful, soul-mate level resonance." },
        15: { personality: "Magnetic, powerful, and understands the shadow.", money: "Enormous wealth potential through high-stakes or luxury.", love: "Intense attraction and overcoming temptations." },
        16: { personality: "Revelatory, breakthrough-driven, and resilient.", money: "Wealth built after a total restructuring of beliefs.", love: "Sudden breakthroughs and structural honesty." },
        17: { personality: "Inspired, hopeful, and truly talented.", money: "Success through fame, public speaking, or arts.", love: "Romantic, idealized, and star-crossed love." },
        18: { personality: "Mystical, subconscious-driven, and imaginative.", money: "Wealth through psychology, hidden info, or intuition.", love: "Deep psychic connection and dream-like romance." },
        19: { personality: "Radiant, joyful, and massively successful.", money: "Abundance through public leadership and light-giving.", love: "Warmth, children, and extreme happiness." },
        20: { personality: "Awakened, family-oriented, and transformative.", money: "Wealth through inheritance or ancestral legacies.", love: "Rebirth of older connections or deep family ties." },
        21: { personality: "Global, free, and worldly explorer.", money: "International success and internet-based wealth.", love: "Freedom-loving and boundary-less connection." },
        22: { personality: "Free spirit, spontaneous, and non-conformist.", money: "Success through unconventional paths or lightheartedness.", love: "Fun, light, and without heavy restrictions." }
    };

    const entry = descriptions[n] || descriptions[1];
    return entry[category as keyof typeof entry] || entry.personality;
};

export const calculateDestinyMatrix = (dob: Date): DestinyMatrixData => {
    const day = dob.getDate();
    const month = dob.getMonth() + 1;
    const yearDigits = dob.getFullYear().toString().split('').map(Number);
    const yearSum = yearDigits.reduce((a, b) => a + b, 0);

    const A = reduceTo22(day); // Personality / Top
    const B = reduceTo22(month); // Spirit / Right
    const C = reduceTo22(yearSum); // Future / Bottom
    const D = reduceTo22(A + B + C); // Social / Left
    const E = reduceTo22(A + B + C + D); // Soul / Center

    // Derived Points
    const F1 = reduceTo22(B + E); // Money Gateway
    const F2 = reduceTo22(C + E); // Love Gateway
    const K1 = reduceTo22(D + E); // Karmic Gateway

    return {
        nodes: {
            ancestral_top: {
                id: 'ancestral_top',
                label: 'Talent & Personality',
                value: A,
                category: 'personality',
                description: getArcanaDescription(A, 'personality')
            },
            ancestral_right: {
                id: 'ancestral_right',
                label: 'Spiritual Connection',
                value: B,
                category: 'spirit',
                description: getArcanaDescription(B, 'personality')
            },
            ancestral_bottom: {
                id: 'ancestral_bottom',
                label: 'Future & Legacy',
                value: C,
                category: 'social',
                description: getArcanaDescription(C, 'personality')
            },
            ancestral_left: {
                id: 'ancestral_left',
                label: 'Social Mask',
                value: D,
                category: 'social',
                description: getArcanaDescription(D, 'personality')
            },
            soul_center: {
                id: 'soul_center',
                label: 'The Soul Comfort',
                value: E,
                category: 'soul',
                description: getArcanaDescription(E, 'personality')
            },
            money_line: {
                id: 'money_line',
                label: 'Money Channel',
                value: F1,
                category: 'money',
                description: getArcanaDescription(F1, 'money')
            },
            love_line: {
                id: 'love_line',
                label: 'Love Channel',
                value: F2,
                category: 'love',
                description: getArcanaDescription(F2, 'love')
            },
            karmic_tail: {
                id: 'karmic_tail',
                label: 'Karmic Debt',
                value: K1,
                category: 'karmic',
                description: getArcanaDescription(K1, 'personality')
            }
        },
        channels: {
            money: [B, F1, E],
            love: [C, F2, E],
            karmic: [D, K1, E]
        }
    };
};
