import { Router } from "express";
const router = Router();
import upload from "../middlewares/multer.config.js";

import {
    createNews,
    getNewsJournalist
} from "../controllers/news.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

import { refreshToken } from "../middlewares/refresh.token.js";

router.post("/create", tokenMiddleware, refreshToken, upload.single('photo'), createNews);

router.get("/:status", tokenMiddleware, refreshToken, getNewsJournalist);

export default router;