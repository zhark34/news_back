import { uploadImage } from "../config/cloudinary.js";
import { deleteImage } from "../config/cloudinary.js";
import Journalist from "../models/journalist.js";
import News from "../models/news.js";
import NewsStatus from "../models/news.status.js";


export const newsEditService = async (title, category, photo, journalistId, action, newsId, photo_id) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } });

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const news = await News.findOne({ where: { news_id: newsId } });

    if (!news) {
        throw new Error("NEWS_NOT_FOUND");
    }

    if (photo_id && photo) {
        await deleteImage(photo_id);
        const { url, public_id } = await uploadImage(photo, "news-image/news/photo");
        news.cover_photo = url;
        news.cover_photo_public_id = public_id;
    }

    const newsStatus = await NewsStatus.findOne({ where: { news_id: newsId, latest: true } });

    newsStatus.latest = false;

    await newsStatus.save();

    if (action === "check") {

        const newsStatusNew = await NewsStatus.create({
            news_id: newsId,
            status: "pending",
            message: "Noticia enviada a revision",
            latest: true,
        });

    } else {

        const newsStatusNew = await NewsStatus.create({
            news_id: newsId,
            status: "draft",
            message: "Noticia guardada como borrador",
            latest: true,
        });

    }

    news.title = title;
    news.category = category;

    await news.save();

    return "Noticia editada correctamente";
};