import { Router } from "express";
const router = Router();
import upload from "../middlewares/multer.config.js";

import {
    createNews,
    getNewsJournalist,
    newsSendToCheck,
    newsBlockCreate,
    newsListPreviewJournalist,
    newsBlockCreatePhoto,
    newsBlockCreateVideo,
    newsBlockUpdate,
    newsEdit,
    newsEditPhoto,
    newsEditVideo,
    newsBlockDelete,
    newsDelete,
    newsModerateList,
    newsListPreviewAdmin,
    newsModerate
} from "../controllers/news.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

import { refreshToken } from "../middlewares/refresh.token.js";

router.get("/news-list-preview-admin/:id", tokenMiddleware, refreshToken, newsListPreviewAdmin);

router.get("/moderate-list", tokenMiddleware, refreshToken, newsModerateList);

router.post("/create", tokenMiddleware, refreshToken, upload.single('photo'), createNews);

router.patch("/send-to-check/:id", tokenMiddleware, refreshToken, newsSendToCheck);

router.post("/news-block/:action", tokenMiddleware, refreshToken, newsBlockCreate);

router.get("/news-list-preview/:id", tokenMiddleware, refreshToken, newsListPreviewJournalist);

router.post("/news-block-photo", tokenMiddleware, refreshToken, upload.single('photo'), newsBlockCreatePhoto)

router.post("/news-block-video", tokenMiddleware, refreshToken, upload.single('video'), newsBlockCreateVideo)

router.patch("/news-block-update/:action", tokenMiddleware, refreshToken, newsBlockUpdate);

router.patch("/edit", tokenMiddleware, refreshToken, upload.single('photo'), newsEdit);

router.patch("/edit-photo", tokenMiddleware, refreshToken, upload.single('photo'), newsEditPhoto);

router.patch("/edit-video", tokenMiddleware, refreshToken, upload.single('video'), newsEditVideo);

router.delete("/block-delete/:id", tokenMiddleware, refreshToken, newsBlockDelete);

router.delete("/delete/:id", tokenMiddleware, refreshToken, newsDelete);

router.get("/list-status-news/:status", tokenMiddleware, refreshToken, getNewsJournalist);

router.patch("/moderate/:action", tokenMiddleware, refreshToken, newsModerate);

export default router;