import { getAllCategoriesServices } from "../services/categories.get.all.services.js"


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