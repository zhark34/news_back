import { Router } from "express";
const router = Router();
import upload from "../middlewares/multer.config.js";

import {
    createNews,
    getNewsJournalist,
    newsSendToCheck,
    newsBlockCreate
} from "../controllers/news.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

import { refreshToken } from "../middlewares/refresh.token.js";

router.post("/create", tokenMiddleware, refreshToken, upload.single('photo'), createNews);

router.get("/:status", tokenMiddleware, refreshToken, getNewsJournalist);

router.patch("/send-to-check/:id", tokenMiddleware, refreshToken, newsSendToCheck);

router.post("/news-block/:action", tokenMiddleware, refreshToken, newsBlockCreate);

export default router;