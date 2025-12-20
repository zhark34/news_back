import Categories from '../models/categories.js'


export const getAllCategoriesServices = async () =>{

    const allCategories = await Categories.findAll();

    if(allCategories.length === 0){

        throw new Error("NO_JOURNALISTS_FOUND");

    }

    return allCategories

}