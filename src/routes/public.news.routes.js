import { Router } from "express";
const router = Router();

import {
    getPublicNewsByCategory,
    getPublicNewsByTitle,
    getLatestNews
} from "../controllers/public.news.controllers.js";


router.get("/full-news/:title", getPublicNewsByTitle);

router.get('/latest-news', getLatestNews);

router.get("/:category", getPublicNewsByCategory);


export default router;