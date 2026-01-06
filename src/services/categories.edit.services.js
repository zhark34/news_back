import Categories from "../models/categories.js";
import Journalist from "../models/journalist.js";

export const editCategoriesServices = async (idCategorie, journalist_id, newCategorieName) => {

    const categories = await Categories.findOne({ where: { category_id: idCategorie } });

    if (!categories) {
        throw new Error("NO_CATEGORIES_FOUND");
    }

    const journalist = await Journalist.findOne({ where: { journalist_id } });

    if (!journalist) {
        throw new Error("NO_JOURNALISTS_FOUND");
    }

    if (journalist.role !== "admin") {
        throw new Error("ADMIN_NO_AUTH");
    }

    categories.category = newCategorieName;

    await categories.save();

    return "Categoria editada correctamente";

}