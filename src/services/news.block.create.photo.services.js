import NewsImage from "../models/news.image.js";
import NewsBlock from "../models/news.block.js";
import Journalist from "../models/journalist.js";
import { uploadImage } from "../config/cloudinary.js";
import News from "../models/news.js";
import { generateId } from "../utils/id.generator.js";

export const newsBlockCreatePhotoService = async (journalistId, caption, photo_source, photo, newsId, blockType, position) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } });

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const news = await News.findOne({ where: { news_id: newsId } });

    if (!news) {
        throw new Error("NEWS_NOT_FOUND");
    }

    if (journalist.journalist_id !== news.journalist_id) {
        throw new Error("NOT_ALLOWED");
    }

    const { url, public_id } = await uploadImage(photo, "news-image/news/photo");

    const newsBlockId = generateId();

    const newsBlock = await NewsBlock.create({
        news_id: newsId,
        block_type: blockType,
        block_id: newsBlockId,
        position: position,
    });

    const newsImage = await NewsImage.create({
        image_url: url,
        image_public_id: public_id,
        caption: caption,
        photo_source: photo_source,
        block_id: newsBlockId,
    });



    return "Bloque de imagen creado exitosamente";

}
