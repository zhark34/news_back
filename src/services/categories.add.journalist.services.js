import Categories from '../models/categories.js'
import CategoriesJournalist from '../models/categories.journalist.js';
import Journalist from '../models/journalist.js'

export const addCategoriesJournalistServices = async (category_id, journalist_id) =>{

    const checkCategories = await Categories.findOne({where: {category_id}});

    if(!checkCategories){

        throw new Error("CATEGORIES_NO_EXIST");

    }

    const checkJournalist = await Journalist.findOne({where: {journalist_id}});

    if(!checkJournalist){

        throw new Error("JOURNALIST_NO_EXIST");

    }

    const checkCategoriesJournalist = await CategoriesJournalist.findOne({where: {category_id, journalist_id}});

    if(checkCategoriesJournalist){

        throw new Error("CATEGORY_ALREADY_ASSIGNED_TO_THE_JOURNALIST");

    }

    await CategoriesJournalist.create({category_id, journalist_id})

    return "Categoria agregada al periodista"

}