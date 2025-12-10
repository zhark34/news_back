import { Router } from "express";
const router = Router();

import { 
    
    getAllJournalist

} from "../controllers/journalist.controllers.js";

router.get("/journalist", getAllJournalist);

export default router;