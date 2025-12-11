import Journalist from "../models/journalist.js";
import CategoriesJournalist from '../models/categories.journalist.js'
import Categories from '../models/categories.js'
import News from '../models/news.js'
import SocialNetworks from '../models/social.networks.js'

export const getOneJournalistFilterServices = async (filters) => {


    const journalistWhere = {};

    if (filters.journalist_id) journalistWhere.journalist_id = filters.journalist_id;
    if (filters.name) journalistWhere.name = filters.name;
    if (filters.email) journalistWhere.email = filters.email;
    if (filters.role) journalistWhere.role = filters.role;

    const categoiesWhere = {};

    const hasCategoryFilter = !!filters.categories;

    if (filters.categories) categoiesWhere.category = filters.categories;

    const journalist = await Journalist.findAll(
        {where: journalistWhere,
        attributes: { exclude: ['password', 'reset_token', 'reset_token_expire']},
        include: [
            {
            model: CategoriesJournalist,
            required: hasCategoryFilter,
            include: [
                {
                    model: Categories,
                    where: categoiesWhere,
                    attributes: ['category', 'category_id'],
                    required: hasCategoryFilter
                }
            ]
        },
        { model: SocialNetworks }, 
        { model: News }
        ]}
    )

    if (!journalist) {
        throw new Error("NO_JOURNALIST_FOUND");
    }

    return journalist;
};