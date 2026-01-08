import Journalist from "../models/journalist.js"
import News from "../models/news.js"
import NewsBlock from "../models/news.block.js"
import NewsEmbed from "../models/news.embed.js"
import NewsList from "../models/news.list.js"
import NewsListItem from "../models/news.list.item.js"
import NewsParagraph from "../models/news.paragraph.js"
import NewsQuote from "../models/news.quote.js"
import { generateId } from "../utils/id.generator.js"

export const newsBlockCreateService = async (journalistId, action, dataForm) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } })

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const news = await News.findOne({ where: { news_id: dataForm.news_id } })

    if (!news) {
        throw new Error("NEWS_NOT_FOUND");
    }

    const blockId = generateId();

    await NewsBlock.create({
        news_id: dataForm.news_id,
        block_type: action,
        block_id: blockId,
        position: dataForm.position
    })

    if (action === "paragraph") {
        await NewsParagraph.create({
            block_id: blockId,
            content: dataForm.content,
            news_id: dataForm.news_id
        })
    }

    if (action === "quote") {
        await NewsQuote.create({
            block_id: blockId,
            quote_text: dataForm.quote_text,
            author: dataForm.author,
            news_id: dataForm.news_id
        })
    }

    if (action === "list") {

        const list_id = generateId();

        await NewsList.create({
            block_id: blockId,
            type: dataForm.type,
            list_id: list_id,
            news_id: dataForm.news_id
        })

        for (let item of dataForm.items) {
            await NewsListItem.create({
                list_id: list_id,
                content: item.content,
                position: item.position
            })
        }

    }

    if (action === "embed") {
        await NewsEmbed.create({
            block_id: blockId,
            embed_code: dataForm.embed_code,
            provider: dataForm.provider,
            news_id: dataForm.news_id
        })
    }

    return `${action} creado con exito`;

}    