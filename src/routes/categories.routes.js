import { Router } from "express";
const router = Router();

import { 
    
    getAllCategories,
    createCategories

} from "../controllers/categories.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

router.get("/all", getAllCategories)

router.post("/create", tokenMiddleware, createCategories)

export default router;