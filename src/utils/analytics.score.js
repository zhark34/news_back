import { SCORE_MAP } from "./score.map.js";

export const analyticsScore = (key, value) => {
    return (SCORE_MAP[key] ?? 0) * value;
};