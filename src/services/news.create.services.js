import { uploadImage } from "../config/cloudinary.js";
import Journalist from "../models/journalist.js";
import News from "../models/news.js";
import NewsStatus from "../models/news.status.js";
import { generateId } from "../utils/id.generator.js";


export const createNewsService = async (title, category, photo, journalistId, action) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } })

    if (!journalist) {
        throw new Error("JOURNALIST_NO_EXIST");
    }

    const { url, public_id } = await uploadImage(photo, "news-image/news/photo");

    const newsId = generateId();

    const news = await News.create({
        title,
        cover_photo: url,
        category,
        journalist_id: journalistId,
        news_id: newsId
    })

    if (action === "check") {

        const newsStatus = await NewsStatus.create({
            status: "checking",
            message: "Esperando aprobación",
            news_id: newsId
        })

    } else {

        const newsStatus = await NewsStatus.create({
            status: "draft",
            message: "Borrador",
            news_id: newsId
        })

    }

    return `Noticia ${action === "check" ? "en espera de aprobación" : "guardada como borrador"}`;

}