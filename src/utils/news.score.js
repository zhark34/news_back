import { analiticsScore } from "./analitics.score.js";

export const newsScore = async (analitics) => {

    var score = 0;

    for (const [key, value] of Object.entries(analitics)) {
        score += analiticsScore(key, value);
    }

    return score;

}