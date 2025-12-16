import { Router } from "express";
const router = Router();

import {

    getOneJournalistSocialNetwork,
    createSocialNetworkJournalist,
    updateSocialNetworkJournalist

} from '../controllers/social.networks.controllers.js'

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

router.get("/:id", getOneJournalistSocialNetwork);

router.post("/me/create", tokenMiddleware, createSocialNetworkJournalist);

router.patch("/me/update", tokenMiddleware, updateSocialNetworkJournalist);

export default router;