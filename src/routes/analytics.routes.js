import { Router } from "express";
const router = Router();

import { createEvent } from "../controllers/analytics.controllers.js";

router.post('/event', createEvent)

export default router;