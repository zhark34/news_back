import { Router } from "express";
const router = Router();

import {

    getOneJournalistSocialNetwork,
    createSocialNetworkJournalist,
    updateSocialNetworkJournalist,
    deleteSocialNetworkJournalist

} from '../controllers/social.networks.controllers.js'

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

import { refreshToken } from "../middlewares/refresh.token.js";

router.get("/:id", getOneJournalistSocialNetwork);

router.post("/me/create", tokenMiddleware, refreshToken, createSocialNetworkJournalist);

router.patch("/me/update", tokenMiddleware, refreshToken, updateSocialNetworkJournalist);

router.delete("/me/delete/:id", tokenMiddleware, refreshToken, deleteSocialNetworkJournalist);

export default router;