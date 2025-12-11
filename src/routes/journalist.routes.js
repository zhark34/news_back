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
    updateEmailJournalist

} from "../controllers/journalist.controllers.js";

router.get("/journalist", getAllJournalist);

router.get("/journalist/:id", getOneJournalist);

router.post("/create", createJournalist);

router.post("/login", loginJournalist)

router.post("/forget-password", forgetPasswordJournalist);

router.post("/reset-password", resetPasswordJournalist);

router.post("/update-name", updateNameJournalist);

router.post("/update-bio", updateBioJournalist);

router.post("/update-email", updateEmailJournalist);

export default router;