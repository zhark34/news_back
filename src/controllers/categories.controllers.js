import { getAllCategoriesServices } from "../services/categories.get.all.services.js"
import { createCategoriesServices } from "../services/categories.create.services.js"
import { addCategoriesJournalistServices } from "../services/categories.add.journalist.services.js"

export const getAllCategories = async (req, res, next) =>{

    try{

        const categories = await getAllCategoriesServices();

        return res.status(200).json({
            message: "OK",
            categories
        });

    } catch (error) {
        console.error(error);

        if (error.message === "NO_CATEGORIES_FOUND") {
            return res.status(404).json({ message: "No hay categorias" });
        }

        return res.status(500).json({ message: "Error al obtener las categorias" });
    }
};

export const createCategories = async (req, res, next) =>{

    const {categorie} = req.body;

    try{

        const categories = await createCategoriesServices(categorie);

        return res.status(200).json({
            message: categories
        });

    } catch (error) {
        console.error(error);

        if (error.message === "CATEGORIES_ALREDY_EXIST") {
            return res.status(404).json({ message: "Categoria ya existe" });
        }

        return res.status(500).json({ message: "Error al crear la categoria" });
    }
};

export const addCategoriesJournalist = async (req, res, next) =>{

    const {id, journalist_id} = req.body;

    

    try{

        const categories = await addCategoriesJournalistServices(id, journalist_id);

        return res.status(200).json({
            message: categories
        });

    } catch (error) {
        console.error(error);

        if (error.message === "CATEGORIES_NO_EXIST") {
            return res.status(404).json({ message: "Categoria no existe" });
        }

        if (error.message === "NO_JOURNALISTS_FOUND") {
            return res.status(404).json({ message: "No hay periodistas" });
        }

        if (error.message === "CATEGORY_ALREADY_ASSIGNED_TO_THE_JOURNALIST") {
            return res.status(404).json({ message: "Categoria ya asignada al periodista" });
        }

        return res.status(500).json({ message: "Error al crear la categoria" });
    }
};