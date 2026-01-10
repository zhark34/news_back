import Journalist from "../models/journalist.js";
import News from "../models/news.js";
import NewsBlock from "../models/news.block.js";
import NewsImage from "../models/news.image.js";
import NewsVideo from "../models/news.video.js";
import NewsParagraph from "../models/news.paragraph.js";
import NewsQuote from "../models/news.quote.js";
import NewsList from "../models/news.list.js";
import NewsListItem from "../models/news.list.item.js";
import NewsEmbed from "../models/news.embed.js";
import { deleteImage, deleteVideo } from "../config/cloudinary.js";
import NewsCaption from "../models/news.caption.js";

export const newsDeleteService = async (journalistId, newsId) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } });

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const news = await News.findOne({ where: { news_id: newsId } });

    if (!news) {
        throw new Error("NEWS_NOT_FOUND");
    }

    if (news.journalist_id !== journalistId) {
        throw new Error("NOT_ALLOWED");
    }

    await news.destroy();

    const blocks = await NewsBlock.findAll({ where: { news_id: newsId } });

    for (const block of blocks) {

        if (block.block_type === "image") {
            await NewsImage.destroy({ where: { block_id: block.block_id } });
            await deleteImage(block.image_public_id);
        }

        if (block.block_type === "video") {
            await NewsVideo.destroy({ where: { block_id: block.block_id } });
            await deleteVideo(block.public_id);
        }

        if (block.block_type === "list") {
            const list = await NewsList.findOne({ where: { block_id: block.block_id } });
            await NewsListItem.destroy({ where: { list_id: list.list_id } });
            await list.destroy();
        }

        if (block.block_type === "paragraph") {
            await NewsParagraph.destroy({ where: { block_id: block.block_id } });
        }

        if (block.block_type === "quote") {
            await NewsQuote.destroy({ where: { block_id: block.block_id } });
        }

        if (block.block_type === "embed") {
            await NewsEmbed.destroy({ where: { block_id: block.block_id } });
        }

        if (block.block_type === "caption") {
            await NewsCaption.destroy({ where: { block_id: block.block_id } });
        }

        await block.destroy();
    }

    return "Noticia eliminada correctamente";

};