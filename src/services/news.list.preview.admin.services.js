import News from "../models/news.js"
import Journalist from "../models/journalist.js"
import NewsBlock from "../models/news.block.js"
import NewsParagraph from "../models/news.paragraph.js"
import NewsQuote from "../models/news.quote.js"
import NewsImage from "../models/news.image.js"
import NewsVideo from "../models/news.video.js"
import NewsEmbed from "../models/news.embed.js"
import NewsList from "../models/news.list.js"
import NewsListItem from "../models/news.list.item.js"
import SocialNetworks from "../models/social.networks.js"
import NewsStatus from "../models/news.status.js"

export const newsListPreviewAdminService = async (journalistId, newsId) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } });

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND")
    }

    const news = await News.findOne({
        where: { news_id: newsId },
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        include: [
            {
                model: Journalist,
                attributes: { exclude: ["id", "createdAt", "updatedAt", "profile_image_public_id", "bio", "email", "password", "role", "reset_token", "reset_token_expire"] },
                include: [{ model: SocialNetworks, attributes: { exclude: ["id", "journalist_id", "createdAt", "updatedAt"] } }]
            },
            {
                model: NewsStatus,
                where: { latest: true },
                attributes: { exclude: ["id", "news_id"] }
            },
            {
                model: NewsBlock,
                attributes: ["block_type", "position", "block_id"],
                include: [
                    { model: NewsParagraph, attributes: { exclude: ["id", "block_id", "news_id", "createdAt", "updatedAt"] } },
                    { model: NewsQuote, attributes: { exclude: ["id", "block_id", "news_id", "createdAt", "updatedAt"] } },
                    { model: NewsImage, attributes: { exclude: ["id", "block_id", "news_id", "createdAt", "updatedAt"] } },
                    { model: NewsVideo, attributes: { exclude: ["id", "block_id", "news_id", "createdAt", "updatedAt"] } },
                    { model: NewsEmbed, attributes: { exclude: ["id", "block_id", "news_id", "createdAt", "updatedAt"] } },
                    {
                        model: NewsList, attributes: { exclude: ["id", "block_id", "news_id", "createdAt", "updatedAt"] },
                        include: [{ model: NewsListItem, attributes: { exclude: ["id", "list_id", "createdAt", "updatedAt", "list_id"] } }]
                    }
                ]
            }
        ]
    });

    if (!news) {
        throw new Error("NEWS_NOT_FOUND")
    }

    const cleanNews = news.toJSON();

    cleanNews.news_blocks = cleanNews.news_blocks.map(block => {
        Object.keys(block).forEach(key => {
            if (
                block[key] === null ||
                (Array.isArray(block[key]) && block[key].length === 0)
            ) {
                delete block[key];
            }
        });
        return block;
    });

    return cleanNews;

}