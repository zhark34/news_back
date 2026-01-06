import Categories from "../models/categories.js"
import Journalist from "../models/journalist.js"

export const deleteCategoriesServices = async (id, journalist_id) => {

    const categories = await Categories.findOne({ where: { category_id: id } });

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

    await categories.destroy();

    return "Categoria eliminada correctamente";

}