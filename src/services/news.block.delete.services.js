import Journalist from "../models/journalist.js";
import News from "../models/news.js";
import NewsBlock from "../models/news.block.js";
import NewsImage from "../models/news.image.js";
import NewsVideo from "../models/news.video.js";
import NewsEmbed from "../models/news.embed.js";
import NewsParagraph from "../models/news.paragraph.js";
import NewsQuote from "../models/news.quote.js";
import NewsList from "../models/news.list.js";
import NewsListItem from "../models/news.list.item.js";
import { deleteImage, deleteVideo } from "../config/cloudinary.js";
import NewsCaption from "../models/news.caption.js";

export const newsBlockDeleteService = async (journalistId, blockId) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } });

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const block = await NewsBlock.findOne({ where: { block_id: blockId } });

    if (!block) {
        throw new Error("BLOCK_NOT_FOUND");
    }

    const news = await News.findOne({ where: { news_id: block.news_id } });

    if (!news) {
        throw new Error("NEWS_NOT_FOUND");
    }

    if (news.journalist_id !== journalistId) {
        throw new Error("NOT_ALLOWED");
    }

    const list = await NewsList.findOne({ where: { block_id: blockId } });

    const image = await NewsImage.findOne({ where: { block_id: blockId } });

    const video = await NewsVideo.findOne({ where: { block_id: blockId } });

    switch (block.block_type) {
        case "image":
            await NewsImage.destroy({ where: { block_id: blockId } });
            await deleteImage(image.image_public_id)
            break;
        case "video":
            await NewsVideo.destroy({ where: { block_id: blockId } });
            await deleteVideo(video.public_id)
            break;
        case "embed":
            await NewsEmbed.destroy({ where: { block_id: blockId } });
            break;
        case "paragraph":
            await NewsParagraph.destroy({ where: { block_id: blockId } });
            break;
        case "quote":
            await NewsQuote.destroy({ where: { block_id: blockId } });
            break;
        case "list":
            await NewsList.destroy({ where: { block_id: blockId } });
            await NewsListItem.destroy({ where: { list_id: list.list_id } });
            break;
        case "caption":
            await NewsCaption.destroy({ where: { block_id: blockId } });
            break;
    }

    await block.destroy();

    return "Bloque eliminado correctamente";

};