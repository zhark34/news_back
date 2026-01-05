import { Router } from "express";
const router = Router();

import {

    getAllCategories,
    createCategories,
    addCategoriesJournalist,
    getCategorieJournalist,
    deleteCategoriesJournalist
} from "../controllers/categories.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

router.get("/all", getAllCategories)

router.post("/create", tokenMiddleware, createCategories)

router.post("/add", tokenMiddleware, addCategoriesJournalist)

router.get("/:id", getCategorieJournalist)

router.delete("/:id", tokenMiddleware, deleteCategoriesJournalist)

export default router;