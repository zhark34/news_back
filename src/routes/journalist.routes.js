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
    logoutJournalist

} from "../controllers/journalist.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

// AUTH

router.post("/login", loginJournalist);

router.post("/register", createJournalist);

router.patch("/password/forget", forgetPasswordJournalist);

router.patch("/password/reset", resetPasswordJournalist);

router.post("/logout", tokenMiddleware, logoutJournalist)

// PRIVATE

router.get("/me/validate", tokenMiddleware, validateJournalistFilter);

router.patch("/me/name", tokenMiddleware, updateNameJournalist);

router.patch("/me/bio", tokenMiddleware, updateBioJournalist);

router.patch("/me/email", tokenMiddleware, updateEmailJournalist);

router.patch("/me/photo", tokenMiddleware, upload.single('photo'), updatePhotoJournalist);

router.patch("/me/password", tokenMiddleware, updatePasswordJournalist);

// ADMIN

router.patch("/:id/role", tokenMiddleware, updateRoleJournalist);

router.delete("/:id", tokenMiddleware, deleteJournalist);

// PUBLIC

router.get("/", getOneJournalistFilter);

router.get("/:id", getOneJournalist);

export default router;