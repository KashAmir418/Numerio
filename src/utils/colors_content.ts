
export interface ColorVibration {
    fortunate: {
        name: string;
        hex: string;
        description: string;
    }[];
    discordant: {
        name: string;
        hex: string;
        description: string;
    }[];
}

export const COLOR_VIBRATIONS: Record<number, ColorVibration> = {
    1: {
        fortunate: [
            { name: "Gold", hex: "#FFD700", description: "Magnifies leadership and personal authority." },
            { name: "Yellow", hex: "#F4C430", description: "Energizes the creative spark and drive." },
            { name: "Orange", hex: "#FFA500", description: "Provides warmth and magnetic attraction." }
        ],
        discordant: [
            { name: "Black", hex: "#0B0B0B", description: "May dampen the natural solar radiance." },
            { name: "Midnight Blue", hex: "#191970", description: "Can create emotional heaviness and isolation." }
        ]
    },
    2: {
        fortunate: [
            { name: "White", hex: "#FFFFFF", description: "Enhances intuition and emotional balance." },
            { name: "Silver", hex: "#C0C0C0", description: "Connects you to your subconscious power." },
            { name: "Cream", hex: "#FFFDD0", description: "Soothes the soul and promotes harmony." }
        ],
        discordant: [
            { name: "Red", hex: "#DC143C", description: "Too aggressive for your gentle vibration." },
            { name: "Black", hex: "#1A1A1A", description: "May block the flow of intuitive insights." }
        ]
    },
    3: {
        fortunate: [
            { name: "Yellow", hex: "#FFF44F", description: "Amplifies joy and self-expression." },
            { name: "Pink", hex: "#F7CAC9", description: "Softens communication and attracts love." },
            { name: "Purple", hex: "#DA70D6", description: "Sparks creative imagination and social flair." }
        ],
        discordant: [
            { name: "Dark Green", hex: "#006400", description: "Can ground your energy too much, limiting expansion." },
            { name: "Black", hex: "#000000", description: "Dulls your natural sparkle and optimism." }
        ]
    },
    4: {
        fortunate: [
            { name: "Light Blue", hex: "#ADD8E6", description: "Promotes clear thinking and innovation." },
            { name: "Grey", hex: "#808080", description: "Stabilizes your energy for long-term builds." },
            { name: "Khaki", hex: "#C3B091", description: "Brings organic balance to your structured world." }
        ],
        discordant: [
            { name: "Red", hex: "#FF0000", description: "Causes restlessness and disrupts your focus." },
            { name: "Yellow", hex: "#FFFF00", description: "Can create mental clutter and unnecessary chaos." }
        ]
    },
    5: {
        fortunate: [
            { name: "Green", hex: "#008000", description: "Vitalizes the spirit and attracts luck in travel." },
            { name: "Turquoise", hex: "#40E0D0", description: "Protects your aura during rapid changes." },
            { name: "Light Blue", hex: "#87CEEB", description: "Keeps the mind fluid and adaptable." }
        ],
        discordant: [
            { name: "Dark Grey", hex: "#A9A9A9", description: "Stagnates your need for movement and variety." },
            { name: "Dark Red", hex: "#8B0000", description: "Can feel suffocating to your freedom-loving soul." }
        ]
    },
    6: {
        fortunate: [
            { name: "White", hex: "#FFFFFF", description: "Radiates purity and domestic peace." },
            { name: "Light Blue", hex: "#ADD8E6", description: "Encourages healing and compassionate service." },
            { name: "Pink", hex: "#FFC0CB", description: "Enhances your natural charm and nurturing power." }
        ],
        discordant: [
            { name: "Yellow", hex: "#FFFF00", description: "Too overwhelming for your harmonious space." },
            { name: "Purple", hex: "#800080", description: "May lead to emotional martyrdom or over-sacrifice." }
        ]
    },
    7: {
        fortunate: [
            { name: "White", hex: "#FFFFFF", description: "Clears the mind for spiritual downloads." },
            { name: "Light Green", hex: "#90EE90", description: "Soothes the nervous system for deep meditation." },
            { name: "Light Blue", hex: "#E0FFFF", description: "Connects you to higher realms of consciousness." }
        ],
        discordant: [
            { name: "Red", hex: "#FF0000", description: "Too loud for your quiet, introspective nature." },
            { name: "Black", hex: "#000000", description: "Increases the risk of melancholic isolation." }
        ]
    },
    8: {
        fortunate: [
            { name: "Dark Blue", hex: "#00008B", description: "Project authority and command respect." },
            { name: "Dark Grey", hex: "#4F4F4F", description: "Provides a solid foundation for material power." },
            { name: "Purple", hex: "#800080", description: "Connects material success with spiritual wisdom." }
        ],
        discordant: [
            { name: "Red", hex: "#FF0000", description: "Can trigger impulsivity and financial risks." },
            { name: "Yellow", hex: "#FFFF00", description: "May weaken your resolve and executive presence." }
        ]
    },
    10: {
        fortunate: [
            { name: "Red", hex: "#FF0000", description: "Ignites your passion for humanitarian causes." },
            { name: "Orange", hex: "#FFA500", description: "Grounds your expansive vision into reality." },
            { name: "Pink", hex: "#FFC0CB", description: "Encourages warmth and universal love." }
        ],
        discordant: [
            { name: "White", hex: "#FFFFFF", description: "Can feel sterile and emotionally disconnected." },
            { name: "Light Blue", hex: "#ADD8E6", description: "Might scatter your focus away from your true mission." }
        ]
    },
    11: {
        fortunate: [
            { name: "Purple", hex: "#6F00FF", description: "Stimulates the third eye and cosmic vision." },
            { name: "Silver", hex: "#C0C0C0", description: "Acts as a conductor for divine inspiration." },
            { name: "White", hex: "#FFFFFF", description: "The purest vibration of spiritual truth." }
        ],
        discordant: [
            { name: "Brown", hex: "#8B4513", description: "Grounds you too heavily in the material plane." },
            { name: "Bright Orange", hex: "#FF8C00", description: "Too jarring for your sensitive psychic system." }
        ]
    },
    22: {
        fortunate: [
            { name: "Copper", hex: "#B87333", description: "The metal of the Master Builder; conducts wealth." },
            { name: "Deep Green", hex: "#006400", description: "Vibrates with the frequency of global impact." },
            { name: "Grey", hex: "#808080", description: "The foundation of enduring monuments." }
        ],
        discordant: [
            { name: "Light Pink", hex: "#FFB6C1", description: "May dissolve the necessary hardness of your vision." },
            { name: "Teal", hex: "#008080", description: "Can distract from the grand architecture of your goals." }
        ]
    },
    33: {
        fortunate: [
            { name: "Amethyst", hex: "#9966CC", description: "The highest frequency of spiritual healing." },
            { name: "Gold", hex: "#FFD700", description: "Balances divine love with human connection." },
            { name: "Light Blue", hex: "#ADD8E6", description: "Vibrates with cosmic peace and protection." }
        ],
        discordant: [
            { name: "Grey", hex: "#808080", description: "Neutralizes the vibrant light you are meant to emit." },
            { name: "Dark Red", hex: "#8B0000", description: "Can ground you in grief rather than grace." }
        ]
    }
};

export interface DailyColorRecommendation {
    color: {
        name: string;
        hex: string;
        description: string;
    };
    rationale: string;
    avoidColor?: {
        name: string;
        hex: string;
        description: string;
    };
    avoidRationale?: string;
}

export const getDailyColorRecommendation = (personalDay: number, lifePath: number): DailyColorRecommendation => {
    // Note: If personalDay is reduced from something else, ensure it is within 1-9 or Master Numbers.
    // In our calculation it should be 1-9 or masters.
    const dayVibrations = COLOR_VIBRATIONS[personalDay] || COLOR_VIBRATIONS[1];
    const lifePathVibrations = COLOR_VIBRATIONS[lifePath] || COLOR_VIBRATIONS[1];

    // Primary suggestion: The first fortunate color of the Personal Day
    let selectedColor = dayVibrations.fortunate[0];
    let rationale = `Today's vibration ${personalDay} aligns perfectly with ${selectedColor.name} to maximize your flow.`;

    // Check if this color is discordant for the Life Path
    const isDiscordant = lifePathVibrations.discordant.some(c => c.name.toLowerCase() === selectedColor.name.toLowerCase());

    if (isDiscordant) {
        // Fallback to the second fortunate color of the day or a life path fortunate color
        selectedColor = dayVibrations.fortunate[1] || lifePathVibrations.fortunate[0];
        rationale = `Since ${dayVibrations.fortunate[0].name} might clash with your core energy today, ${selectedColor.name} acts as a balancing frequency.`;
    }

    // Colors to Avoid: Primarily the discordant colors of the Personal Day
    const avoidColor = dayVibrations.discordant[0];
    const avoidRationale = `Exposure to ${avoidColor.name} today may trigger unnecessary friction or mental drag under the ${personalDay} frequency.`;

    return { color: selectedColor, rationale, avoidColor, avoidRationale };
};
