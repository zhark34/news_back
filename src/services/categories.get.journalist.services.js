import CategoriesJournalist from "../models/categories.journalist.js"
import Journalist from "../models/journalist.js"
import Categories from "../models/categories.js"

export const getCategorieJournalistServices = async (id) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: id } });

    if (!journalist) {
        throw new Error("NO_JOURNALISTS_FOUND");
    }

    const categories = await CategoriesJournalist.findAll({ where: { journalist_id: id }, include: { model: Categories } });

    if (!categories) {
        throw new Error("NO_CATEGORIES_FOUND");
    }

    return categories;
}