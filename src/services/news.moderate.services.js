import Journalist from "../models/journalist.js"
import News from "../models/news.js"
import NewsStatus from "../models/news.status.js"

export const newsModerateService = async (journalistId, action, newsId, msg) => {

    try {
        const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } });

        if (!journalist) {
            throw new Error("JOURNALIST_NOT_FOUND")
        }

        if (journalist.role === "journalist") {
            throw new Error("NOT_ALLOWED")
        }

        const news = await News.findOne({ where: { news_id: newsId } });

        if (!news) {
            throw new Error("NEWS_NOT_FOUND")
        }

        const newsStatus = await NewsStatus.findOne({ where: { news_id: newsId, latest: true } });

        if (!newsStatus) {
            throw new Error("NEWS_STATUS_NOT_FOUND")
        }

        if (action === "approve") {
            await NewsStatus.create({ news_id: newsId, status: "published", message: "Noticia aprobada", latest: true })
            newsStatus.latest = false;
        } else if (action === "reject") {
            await NewsStatus.create({ news_id: newsId, status: "rejected", message: msg, latest: true })
            newsStatus.latest = false;
        }

        await newsStatus.save()

        return `Noticia ${action === "approve" ? "aprobada" : "rechazada"} correctamente`

    } catch (error) {
        console.log(error)
        throw error
    }

}