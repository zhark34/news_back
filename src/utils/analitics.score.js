import { SCORE_MAP } from "./score.map.js";

export const analiticsScore = (key, value) => {
    return (SCORE_MAP[key] ?? 0) * value;
};