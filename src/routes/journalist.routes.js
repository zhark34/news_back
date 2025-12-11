import { Router } from "express";
const router = Router();

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
    updateRoleJournalist

} from "../controllers/journalist.controllers.js";

router.get("/journalist", getAllJournalist);

router.get("/journalist/:id", getOneJournalist);

router.post("/create", createJournalist);

router.post("/login", loginJournalist)

router.patch("/forget-password", forgetPasswordJournalist);

router.patch("/reset-password", resetPasswordJournalist);

router.patch("/update-name", updateNameJournalist);

router.patch("/update-bio", updateBioJournalist);

router.patch("/update-email", updateEmailJournalist);

router.patch("/update-role", updateRoleJournalist)

export default router;