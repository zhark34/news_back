import { Router } from "express";
const router = Router();

import {
    getPublicNewsByCategory,
    getPublicNewsByTitle,
    getLatestNews,
    getNewsByScore
} from "../controllers/public.news.controllers.js";


router.get("/full-news/:title", getPublicNewsByTitle);

router.get('/latest-news/:category', getLatestNews);

router.get("/:category", getPublicNewsByCategory);

router.get("/score/:category", getNewsByScore);


export default router;