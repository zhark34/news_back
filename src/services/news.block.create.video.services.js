import { uploadVideo } from "../config/cloudinary.js";
import { generateId } from "../utils/id.generator.js";
import Journalist from "../models/journalist.js";
import News from "../models/news.js";
import NewsBlock from "../models/news.block.js";
import NewsVideo from "../models/news.video.js";

export const newsBlockCreateVideoService = async (journalistId, caption, videoPath, newsId, blockType, position) => {

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

    const { url, public_id } = await uploadVideo(videoPath, "news-video/news/video");

    const blockId = generateId();

    const newsBlock = await NewsBlock.create({
        block_id: blockId,
        news_id: newsId,
        block_type: blockType,
        position
    });



    const newsVideo = await NewsVideo.create({
        video_url: url,
        public_id,
        caption,
        block_id: blockId,
        news_id: newsId
    });

    return "Bloque de video creado correctamente";
}
