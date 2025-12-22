import Categories from '../models/categories.js'

export const createCategoriesServices = async (categorie) =>{

    const checkCategories = await Categories.findOne({where: {category: categorie}});

    if(checkCategories){

        throw new Error("CATEGORIES_ALREDY_EXIST");

    }

    await Categories.create({category_id: Date.now() ,category: categorie})

    return "Categoria creada"

}