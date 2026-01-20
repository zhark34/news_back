import News from "../models/news.js";
import NewsStatus from "../models/news.status.js";
import NewsAnalyticsDaily from "../models/news.analytics.daily.js";
import { Op } from "sequelize";
import { newsScore } from "../utils/news.score.js";

export const getNewsByScoreService = async (category) => {

    const maxDate = new Date();

    maxDate.setUTCDate(maxDate.getUTCDate() + 2);

    const news = await News.findAll({
        where: { category },
        include: [
            {
                model: NewsStatus,
                required: true,
                where: {
                    status: "published",
                    latest: true,
                    createdAt: { [Op.lte]: maxDate }
                },
                attributes: { exclude: ["id", "news_id", "createdAt", "updatedAt", "message", "latest"] }
            },
            { model: NewsAnalyticsDaily, required: false, attributes: { exclude: ["id", "news_id", "unique_views", "createdAt", "updatedAt", "date"] }, where: { date: { [Op.lte]: maxDate } } }
        ]
    });

    const scoreNews = await Promise.all(
        news.map(async (item) => {
            const analytics = item.news_analytics_dailies;
            const score = await newsScore(analytics);

            return {
                ...item.toJSON(),
                score: score
            };
        })
    );

    const sortedNews = scoreNews.sort((a, b) => b.score - a.score);

    return sortedNews.map(({ score, news_analytics_dailies, ...item }) => item);

}