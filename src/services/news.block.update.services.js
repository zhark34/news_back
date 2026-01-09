import Journalist from "../models/journalist.js"
import News from "../models/news.js"
import NewsBlock from "../models/news.block.js"
import NewsEmbed from "../models/news.embed.js"
import NewsList from "../models/news.list.js"
import NewsListItem from "../models/news.list.item.js"
import NewsParagraph from "../models/news.paragraph.js"
import NewsQuote from "../models/news.quote.js"

export const newsBlockUpdateService = async (journalistId, action, dataForm) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } })

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const news = await News.findOne({ where: { news_id: dataForm.news_id } })

    if (!news) {
        throw new Error("NEWS_NOT_FOUND");
    }

    const block = await NewsBlock.findOne({
        where: {
            block_id: dataForm.block_id,
        }
    })

    if (!block) {
        throw new Error("BLOCK_NOT_FOUND");
    }

    if (action === "paragraph") {

        const paragraph = await NewsParagraph.findOne({
            where: {
                block_id: dataForm.block_id,
            }
        })

        if (!paragraph) {
            throw new Error("PARAGRAPH_NOT_FOUND");
        }

        await paragraph.update({
            content: dataForm.content,
            position: dataForm.position,
        })
    }

    if (action === "quote") {
        const quote = await NewsQuote.findOne({
            where: {
                block_id: dataForm.block_id,
            }
        })

        if (!quote) {
            throw new Error("QUOTE_NOT_FOUND");
        }

        await quote.update({
            quote_text: dataForm.quote_text,
            author: dataForm.author,
        })
    }

    if (action === "list") {

        const list = await NewsList.findOne({
            where: {
                block_id: dataForm.block_id,
            }
        })

        if (!list) {
            throw new Error("LIST_NOT_FOUND");
        }

        await list.update({
            type: dataForm.type,
        })

        for (let item of dataForm.items) {
            const list_item = await NewsListItem.findOne({
                where: {
                    list_id: list.list_id,
                    position: item.position,
                }
            })

            if (!list_item) {
                throw new Error("LIST_ITEM_NOT_FOUND");
            }

            await list_item.update({
                content: item.content,
            })
        }

    }

    if (action === "embed") {
        const embed = await NewsEmbed.findOne({
            where: {
                block_id: dataForm.block_id,
            }
        })

        if (!embed) {
            throw new Error("EMBED_NOT_FOUND");
        }

        await embed.update({
            embed_code: dataForm.embed_code,
            provider: dataForm.provider,
        })
    }

    return `${action} actualizado con exito`;

}    