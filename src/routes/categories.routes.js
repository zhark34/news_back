import { Router } from "express";
const router = Router();

import {

    getAllCategories,
    createCategories,
    addCategoriesJournalist,
    getCategorieJournalist,
    deleteCategoriesJournalist,
    editCategories,
    deleteCategories

} from "../controllers/categories.controllers.js";

import { tokenMiddleware } from "../middlewares/token.middlewares.js";

import { refreshToken } from "../middlewares/refresh.token.js";

router.get("/all", getAllCategories)

router.post("/create", tokenMiddleware, refreshToken, createCategories)

router.patch("/edit", tokenMiddleware, refreshToken, editCategories)

router.delete("/delete/:id", tokenMiddleware, refreshToken, deleteCategories)

router.post("/add", tokenMiddleware, refreshToken, addCategoriesJournalist)

router.get("/:id", getCategorieJournalist)

router.delete("/:id", tokenMiddleware, refreshToken, deleteCategoriesJournalist)

export default router;