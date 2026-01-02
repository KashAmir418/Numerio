export interface NumberReading {
    archetype: string;
    essence: string;
    light: string[];
    shadow: string[];
    love: string;
    career: string;
    soulLesson: string;
}

export interface LayeredReading {
    layer1_lifePath: NumberReading;
    layer2_monthStats: {
        monthName: string;
        influence: string;
    };
    layer3_dayStats: {
        dayNumber: number;
        nuance: string;
    };
}
