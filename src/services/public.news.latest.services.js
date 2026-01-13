import News from "../models/news.js";
import NewsStatus from "../models/news.status.js"

export const getLatestNewsService = async () => {

    const news = await News.findAll({
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

    news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return news;

}
