import { Router } from "express";
const router = Router();

import { 
    
    getAllJournalist,
    getOneJournalist,
    createJournalist,
    loginJournalist

} from "../controllers/journalist.controllers.js";

router.get("/journalist", getAllJournalist);

router.get("/journalist/:id", getOneJournalist);

router.post("/create", createJournalist);

router.post("/login", loginJournalist)

export default router;