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
        description: "AI is likely to augment your work rather than fundamentally change your core tasks. Focus on using AI tools to handle repetitive administrative work.",
        color: "#10b981" // Emerald-500
    },
    {
        min: 26,
        max: 50,
        label: "Moderate Impact",
        description: "Expect significant changes in how you perform certain tasks. AI will become a powerful co-pilot, requiring you to adapt your workflow and focus on higher-level strategy.",
        color: "#f59e0b" // Amber-500
    },
    {
        min: 51,
        max: 75,
        label: "High Impact",
        description: "A substantial portion of your current tasks could be automated or significantly altered. Professional pivot or deep integration of AI into your core skillset is recommended.",
        color: "#f97316" // Orange-500
    },
    {
        min: 76,
        max: 100,
        label: "Very High Impact",
        description: "The majority of tasks in this role are highly suitable for AI automation. This transition represents an opportunity to redefine the role around human-centric values and complex problem-solving.",
        color: "#ef4444" // Red-500
    }
];

export const getRiskBand = (score: number): RiskBand => {
    return RISK_BANDS.find(band => score >= band.min && score <= band.max) || RISK_BANDS[0];
};
