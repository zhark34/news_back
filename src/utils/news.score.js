import { analyticsScore } from "./analytics.score.js";

export const newsScore = async (analyticsArray) => {

    if (!Array.isArray(analyticsArray) || analyticsArray.length === 0) return 0;

    var score = 0;

    for (const dailyData of analyticsArray) {
        const data = dailyData.toJSON ? dailyData.toJSON() : dailyData;

        for (const [key, value] of Object.entries(data)) {
            score += analyticsScore(key, value);
        }
    }

    return score;

}