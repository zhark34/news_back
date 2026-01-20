import News from "../models/news.js"
import NewsStatus from "../models/news.status.js"

export const getNewsMetricsService = async () => {

    const news = await News.findAll(
        {
            include: [
                {
                    model: NewsStatus,
                    where: {
                        status: "published",
                        latest: true
                    },
                    attributes: { exclude: ["id", "news_id", "createdAt", "updatedAt", "message", "latest"] }
                }
            ]
        }
    );

    return news;

}