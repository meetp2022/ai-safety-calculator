/**
 * Scoring Constants for AI Job Safety Calculator
 */

export const SCORING_CONSTANTS = {
    WEIGHTS: {
        AS: 0.35,
        ACM: 0.25,
        AF: 0.20,
        HAF: 0.20,
    },
    EXPERIENCE_MODIFIERS: {
        ENTRY: 1.2,  // More standard tasks, higher risk
        MID: 1.0,
        SENIOR: 0.8,
        EXPERT: 0.6, // More specialized judgment, lower risk
    },
    FREQUENCY_WEIGHTS: {
        DAILY: 1.0,
        WEEKLY: 0.7,
        MONTHLY: 0.4,
        RARELY: 0.1,
    }
};
