export interface RiskBand {
    min: number;
    max: number;
    label: string;
    description: string;
    color: string;
}

export const RISK_BANDS: RiskBand[] = [
    {
        min: 0,
        max: 25,
        label: "Low Impact",
        description: "Your role remains fundamentally human-driven. AI will serve as a digital assistant for low-complexity administrative tasks. Your core professional value—judgment and creative intuition—is not easily replicated by current models.",
        color: "#10b981" // Emerald-500
    },
    {
        min: 26,
        max: 50,
        label: "Moderate Impact",
        description: "AI will function as a high-performance co-pilot. While your core mission remains, the 'how' will change significantly. Expect to shift your focus toward strategic oversight and nuanced decision-making as routine workflows are automated.",
        color: "#f59e0b" // Amber-500
    },
    {
        min: 51,
        max: 75,
        label: "High Impact",
        description: "A fundamental transformation of your professional landscape is occurring. A majority of your current daily tasks are within the high-capability zone of AI. Success will require pivoting toward orchestrating AI systems or specializing in high-context problem solving.",
        color: "#f97316" // Orange-500
    },
    {
        min: 76,
        max: 100,
        label: "Very High Impact",
        description: "This role is in the direct path of rapid automation. Most traditional tasks are highly structured and data-rich, making them prime candidates for total AI integration. Your future value lies in redefining the role around empathy, ethics, and extreme ambiguity.",
        color: "#ef4444" // Red-500
    }
];

export const getRiskBand = (score: number): RiskBand => {
    return RISK_BANDS.find(band => score >= band.min && score <= band.max) || RISK_BANDS[0];
};
