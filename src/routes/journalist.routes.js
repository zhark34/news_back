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
    deleteJournalist

} from "../controllers/journalist.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

// AUTH

router.post("/register", createJournalist);

router.post("/login", loginJournalist);

router.patch("/forget-password", forgetPasswordJournalist);

router.patch("/reset-password", resetPasswordJournalist);

// PUBLIC

router.get("/journalist", getOneJournalistFilter);

router.get("/journalist/:id", getOneJournalist);

// PRIVATE

router.get("/journalist-validate", tokenMiddleware, validateJournalistFilter);

router.patch("/update-name", tokenMiddleware, updateNameJournalist);

router.patch("/update-bio", tokenMiddleware, updateBioJournalist);

router.patch("/update-email", tokenMiddleware, updateEmailJournalist);

router.patch("/update-photo", tokenMiddleware, upload.single('photo'),updatePhotoJournalist);

router.patch("/update-password", tokenMiddleware, updatePasswordJournalist);

// ADMIN

router.patch("/update-role", tokenMiddleware, updateRoleJournalist);

router.delete("/delete/:id", tokenMiddleware, deleteJournalist);

export default router;