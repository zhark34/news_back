import { Router } from "express";
const router = Router();

import upload from "../middlewares/multer.config.js";

import {

    getAllJournalist,
    getOneJournalist,
    createJournalist,
    loginJournalist,
    forgetPasswordJournalist,
    resetPasswordJournalist,
    updateNameJournalist,
    updateBioJournalist,
    updateEmailJournalist,
    updateRoleJournalist,
    updatePhotoJournalist,
    updatePasswordJournalist,
    getOneJournalistFilter,
    validateJournalistFilter,
    deleteJournalist,
    logoutJournalist,
    updatePasswordByAdmin

} from "../controllers/journalist.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

import { refreshToken } from "../middlewares/refresh.token.js";

// AUTH

router.post("/login", loginJournalist);

router.post("/register", tokenMiddleware, refreshToken, createJournalist);

router.patch("/password/forget", forgetPasswordJournalist);

router.patch("/password/reset", resetPasswordJournalist);

router.post("/logout", tokenMiddleware, refreshToken, logoutJournalist)

// PRIVATE

router.get("/me/validate", tokenMiddleware, validateJournalistFilter);

router.patch("/me/name", tokenMiddleware, refreshToken, updateNameJournalist);

router.patch("/me/bio", tokenMiddleware, refreshToken, updateBioJournalist);

router.patch("/me/email", tokenMiddleware, refreshToken, updateEmailJournalist);

router.patch("/me/photo", tokenMiddleware, refreshToken, upload.single('photo'), updatePhotoJournalist);

router.patch("/me/password", tokenMiddleware, refreshToken, updatePasswordJournalist);

// ADMIN

router.patch("/:id/role", tokenMiddleware, refreshToken, updateRoleJournalist);

router.delete("/:id", tokenMiddleware, refreshToken, deleteJournalist);

router.patch("/admin/password", tokenMiddleware, refreshToken, updatePasswordByAdmin);

// PUBLIC

router.get("/", getOneJournalistFilter);

router.get("/:id", getOneJournalist);

export default router;