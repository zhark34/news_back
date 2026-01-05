import { Router } from "express";
const router = Router();

import {
    getOneSession,
    deleteSession
} from "../controllers/sessions.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

router.get("/:id", tokenMiddleware, getOneSession);

router.delete("/:id", tokenMiddleware, deleteSession);

export default router;
