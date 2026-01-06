import Categories from '../models/categories.js'
import Journalist from '../models/journalist.js'

export const createCategoriesServices = async (categorie, admin_id) => {

    const checkCategories = await Categories.findOne({ where: { category: categorie } });

    if (checkCategories) {

        throw new Error("CATEGORIES_ALREDY_EXIST");

    }

    const checkAdmin = await Journalist.findOne({ where: { journalist_id: admin_id } });

    if (!checkAdmin) {

        throw new Error("ADMIN_NO_EXIST");

    }

    if (checkAdmin.role !== "admin") {

        throw new Error("ADMIN_NO_AUTH");

    }

    await Categories.create({ category_id: Date.now(), category: categorie })

    return "Categoria creada"

}