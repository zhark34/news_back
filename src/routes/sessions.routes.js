import { Router } from "express";
const router = Router();

import {
    getOneSession
} from "../controllers/sessions.controllers.js";

router.get("/:id", getOneSession);

export default router;
