
import Journalist from "../models/journalist.js"
import CategoriesJournalist from "../models/categories.journalist.js"

export const deleteCategoriesJournalistServices = async (id, journalist_id) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalist_id } });

    if (!journalist) {
        throw new Error("NO_JOURNALISTS_FOUND");
    }

    const deletedRows = await CategoriesJournalist.destroy({
        where: {
            journalist_id: journalist_id,
            category_id: id
        }
    });

    if (deletedRows === 0) {
        throw new Error("NO_CATEGORIES_FOUND");
    }

    return "CATEGORIA ELIMINADA";
}