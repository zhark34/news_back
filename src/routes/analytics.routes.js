import { Router } from "express";
const router = Router();

import {
    createEvent,
    getNewsMetrics,
    getNewsMetricsByNews,
    getRankingJournalist,
    getReadings
} from "../controllers/analytics.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

import { refreshToken } from "../middlewares/refresh.token.js";

router.post('/event', createEvent)

router.get('/news/metrics', tokenMiddleware, refreshToken, getNewsMetrics);

router.get('/news/metrics-by-news/:id', tokenMiddleware, refreshToken, getNewsMetricsByNews);

router.get('/journalist/ranking', tokenMiddleware, refreshToken, getRankingJournalist);

router.get('/readings', tokenMiddleware, refreshToken, getReadings);

export default router;