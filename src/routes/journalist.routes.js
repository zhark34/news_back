import { Router } from "express";
const router = Router();

import { 
    
    getAllJournalist,
    getOneJournalist

} from "../controllers/journalist.controllers.js";

router.get("/journalist", getAllJournalist);

router.get("/journalist/:id", getOneJournalist);

export default router;