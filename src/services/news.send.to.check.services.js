import NewsStatus from "../models/news.status.js";
import Journalist from "../models/journalist.js";
import News from "../models/news.js";

export const newsSendToCheckService = async (journalistId, newsId) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } });

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const news = await News.findOne({ where: { news_id: newsId, journalist_id: journalistId } });

    if (!news) {
        throw new Error("NEWS_NOT_FOUND");
    }

    const newsStatus = await NewsStatus.findOne({ where: { news_id: newsId, latest: true } });

    if (newsStatus) {
        newsStatus.latest = false;
        await newsStatus.save();
    }

    await NewsStatus.create({
        news_id: newsId,
        status: "pending",
        message: "Noticia enviada a revision",
        latest: true
    });

    return "Noticia enviada a revision";

};