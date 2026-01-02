export interface ZodiacSign {
    name: string;
    symbol: string;
    element: 'Fire' | 'Earth' | 'Air' | 'Water';
    dates: string;
}

export const getZodiacSign = (day: number, month: number): ZodiacSign => {
    // Standard Tropical Zodiac Dates
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
        return { name: "Aries", symbol: "♈", element: "Fire", dates: "Mar 21 - Apr 19" };
    }
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
        return { name: "Taurus", symbol: "♉", element: "Earth", dates: "Apr 20 - May 20" };
    }
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
        return { name: "Gemini", symbol: "♊", element: "Air", dates: "May 21 - Jun 20" };
    }
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
        return { name: "Cancer", symbol: "♋", element: "Water", dates: "Jun 21 - Jul 22" };
    }
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
        return { name: "Leo", symbol: "♌", element: "Fire", dates: "Jul 23 - Aug 22" };
    }
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
        return { name: "Virgo", symbol: "♍", element: "Earth", dates: "Aug 23 - Sep 22" };
    }
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
        return { name: "Libra", symbol: "♎", element: "Air", dates: "Sep 23 - Oct 22" };
    }
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
        return { name: "Scorpio", symbol: "♏", element: "Water", dates: "Oct 23 - Nov 21" };
    }
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
        return { name: "Sagittarius", symbol: "♐", element: "Fire", dates: "Nov 22 - Dec 21" };
    }
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return { name: "Capricorn", symbol: "♑", element: "Earth", dates: "Dec 22 - Jan 19" };
    }
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
        return { name: "Aquarius", symbol: "♒", element: "Air", dates: "Jan 20 - Feb 18" };
    }
    return { name: "Pisces", symbol: "♓", element: "Water", dates: "Feb 19 - Mar 20" };
};
