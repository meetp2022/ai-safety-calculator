import { SCORING_CONSTANTS } from './modifiers';

export interface TaskInput {
    name: string;
    as: number;
    acm: number;
    af: number;
    haf: number;
    frequency: keyof typeof SCORING_CONSTANTS.FREQUENCY_WEIGHTS;
    isCoreValue?: boolean;
}

/**
 * Advanced Task Impact Score (v2)
 * Uses non-linear amplification for high-risk factor combinations.
 */
export const calculateTIS = (task: TaskInput): number => {
    const { as, acm, af, haf, frequency, isCoreValue } = task;
    const freqWeight = SCORING_CONSTANTS.FREQUENCY_WEIGHTS[frequency];

    // Non-linear amplification: High AS and High ACM together are more dangerous than their product
    // We use powers to accentuate high values
    const rawExposure = Math.pow(as, 1.25) * Math.pow(acm, 1.25) * af;

    // HAF (Human Advantage) has a "moat" effect. 
    // If HAF is very high (>0.85), it provides exponential protection.
    const protection = haf > 0.85 ? Math.pow(haf, 2) : haf;

    let baseScore = rawExposure * (1 - (protection * 0.85));

    // Core Value Modifier: If this is the user's "Primary Value", impact is more significant
    if (isCoreValue) {
        baseScore *= 1.3;
    }

    return baseScore * freqWeight;
};

/**
 * Job-Level Impact Calculation with Environmental Context
 */
export const calculateAdvancedScore = (
    tasks: TaskInput[],
    experienceModifier: number,
    companyAdoptionRate: number = 1.0 // 0.8 (Slow) to 1.2 (Aggressive)
): number => {
    if (tasks.length === 0) return 0;

    const totalScore = tasks.reduce((acc, task) => acc + calculateTIS(task), 0);
    const averageImpact = totalScore / tasks.length;

    // The normalization factor is tuned for the non-linear model
    // A high-risk role should hit 85-95, a safe role should hit 10-25
    const normalized = averageImpact * 220 * experienceModifier * companyAdoptionRate;

    return Math.min(Math.max(Math.round(normalized), 0), 100);
};
