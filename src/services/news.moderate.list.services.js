import News from "../models/news.js";
import Journalist from "../models/journalist.js";
import NewsStatus from "../models/news.status.js";
import { Op } from "sequelize";

export const newsModerateListService = async (journalistId) => {

    const journalist = await Journalist.findOne({
        where: { journalist_id: journalistId }
    });

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const news = await News.findAll({
        where: {
            journalist_id: {
                [Op.ne]: journalistId
            }
        },
        include: [
            {
                model: Journalist,
                attributes: { exclude: ["id", "journalist_id", "password", "email", "role", "createdAt", "updatedAt", "profile_image_url", "profile_image_public_id", "reset_token_expire", "reset_token", "bio"] }
            },
            {
                model: NewsStatus,
                where: {
                    latest: true,
                    status: "pending"
                },
                attributes: { exclude: ["news_id", "id"] }
            }
        ],
    });


    return { news };
};
