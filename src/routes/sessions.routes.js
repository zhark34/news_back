import { Router } from "express";
const router = Router();

import {
    getOneSession,
    deleteSession
} from "../controllers/sessions.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

import { refreshToken } from "../middlewares/refresh.token.js";

router.get("/:id", tokenMiddleware, refreshToken, getOneSession);

router.delete("/:id", tokenMiddleware, refreshToken, deleteSession);

export default router;