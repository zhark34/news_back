import Journalist from "../models/journalist.js"
import News from "../models/news.js"
import NewsBlock from "../models/news.block.js"
import NewsVideo from "../models/news.video.js"
import { deleteVideo, uploadVideo } from "../config/cloudinary.js"


export const newsEditVideoService = async (newsId, videoPath, journalistId, videoId, caption, position, blockId) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } })

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND")
    }

    const news = await News.findOne({ where: { news_id: newsId } })

    if (!news) {
        throw new Error("NEWS_NOT_FOUND")
    }

    if (journalist.journalist_id !== news.journalist_id) {
        throw new Error("JOURNALIST_NOT_AUTHORIZED")
    }

    const block = await NewsBlock.findOne({ where: { block_id: blockId } })

    if (!block) {
        throw new Error("BLOCK_NOT_FOUND")
    }

    const video = await NewsVideo.findOne({ where: { public_id: videoId } })

    if (!video) {
        throw new Error("VIDEO_NOT_FOUND")
    }

    if (videoPath) {

        await deleteVideo(videoId);

        const { url, public_id } = await uploadVideo(videoPath, "news-video/news/video");

        video.video_url = url;
        video.public_id = public_id;

    }

    video.caption = caption;
    video.position = position;

    await video.save();

    return "Bloque de video editado correctamente";

}