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

router.get("/journalist", getAllJournalist);

router.get("/journalist/:id", getOneJournalist);

router.post("/create", createJournalist);

router.post("/login", loginJournalist)

router.patch("/forget-password", forgetPasswordJournalist);

router.patch("/reset-password", resetPasswordJournalist);

router.patch("/update-name", tokenMiddleware, updateNameJournalist);

router.patch("/update-bio", tokenMiddleware, updateBioJournalist);

router.patch("/update-email", updateEmailJournalist);

router.patch("/update-role", updateRoleJournalist);

router.patch("/update-photo", upload.single('photo'),updatePhotoJournalist);

router.patch("/update-password", updatePasswordJournalist);

router.get("/journalist-filter", getOneJournalistFilter);

router.get("/journalist-validate", tokenMiddleware, validateJournalistFilter);

router.delete("/delete/:id", tokenMiddleware, deleteJournalist);

export default router;