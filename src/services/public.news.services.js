import News from "../models/news.js"
import NewsStatus from "../models/news.status.js"

export const getPublicNewsByCategoryService = async (category) => {

    const news = await News.findAll({
        where: {
            category
        },
        include: [
            {
                model: NewsStatus,
                where: {
                    status: "published",
                    latest: true
                },
                required: true
            }
        ]
    });

    if (!news) {
        throw new Error("NOT_NEWS_FOUND");
    }

    news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return news;

}