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
import NewsCaption from "../models/news.caption.js"
export const getPublicNewsByTitleService = async (title) => {

    const news = await News.findOne({ where: { title } });

    if (!news) {
        throw new Error("NOT_NEWS_FOUND");
    }

    const bodyNews = await News.findOne({
        where: { news_id: news.news_id },
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
                    { model: NewsCaption, attributes: { exclude: ["id", "block_id", "news_id", "createdAt", "updatedAt"] } },
                    {
                        model: NewsList, attributes: { exclude: ["id", "block_id", "news_id", "createdAt", "updatedAt"] },
                        include: [{ model: NewsListItem, attributes: { exclude: ["id", "list_id", "createdAt", "updatedAt", "list_id"] } }]
                    }
                ]
            }
        ]
    });

    return bodyNews;

}