import { Router } from "express";
const router = Router();

import { 
    
    getAllCategories

} from "../controllers/categories.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

router.get("/all", getAllCategories)

export default router;