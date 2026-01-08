import Journalist from "../models/journalist.js"
import News from "../models/news.js"
import NewsStatus from "../models/news.status.js"

export const getNewsJournalistService = async (journalistId, status) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } })

    if (!journalist) {
        throw new Error("Periodista no encontrado")
    }

    if (status === "all") {
        const news = await News.findAll({ where: { journalist_id: journalistId }, include: [{ model: NewsStatus, as: "news_statuses" }] })

        if (!news) {
            throw new Error("NO_NEWS_FOUND")
        }

        return news
    } if (status === "draft") {
        const news = await News.findAll({ where: { journalist_id: journalistId }, include: [{ model: NewsStatus, as: "news_statuses", where: { status: status } }] })

        if (!news) {
            throw new Error("NO_NEWS_FOUND")
        }

        return news
    } if (status === "pending") {
        const news = await News.findAll({ where: { journalist_id: journalistId }, include: [{ model: NewsStatus, as: "news_statuses", where: { status: status } }] })

        if (!news) {
            throw new Error("NO_NEWS_FOUND")
        }

        return news
    } if (status === "published") {
        const news = await News.findAll({ where: { journalist_id: journalistId }, include: [{ model: NewsStatus, as: "news_statuses", where: { status: status } }] })

        if (!news) {
            throw new Error("NO_NEWS_FOUND")
        }

        return news
    } if (status === "rejected") {
        const news = await News.findAll({ where: { journalist_id: journalistId }, include: [{ model: NewsStatus, as: "news_statuses", where: { status: status } }] })

        if (!news) {
            throw new Error("NO_NEWS_FOUND")
        }

        return news
    }

}