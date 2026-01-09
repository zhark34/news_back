import Journalist from "../models/journalist.js"
import News from "../models/news.js"
import { deleteImage, uploadImage } from "../config/cloudinary.js"
import NewsBlock from "../models/news.block.js"
import NewsImage from "../models/news.image.js"

export const newsEditPhotoService = async (newsId, photoPath, journalistId, photoId, caption, photoSource, position, blockId) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } })

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND")
    }

    const news = await News.findOne({ where: { news_id: newsId } })

    if (!news) {
        throw new Error("NEWS_NOT_FOUND")
    }

    const block = await NewsBlock.findOne({ where: { block_id: blockId } })

    if (!block) {
        throw new Error("BLOCK_NOT_FOUND")
    }

    if (journalist.journalist_id !== news.journalist_id) {
        throw new Error("JOURNALIST_NOT_AUTHORIZED")
    }

    const photo = await NewsImage.findOne({ where: { block_id: blockId } })

    if (!photo) {
        throw new Error("PHOTO_NOT_FOUND")
    }

    if (photoPath) {

        await deleteImage(photoId)

        const { url, public_id } = await uploadImage(photoPath, "news-image/news/photo")

        photo.image_url = url
        photo.image_public_id = public_id

    }

    photo.caption = caption
    photo.photo_source = photoSource
    photo.position = position

    await photo.save()

    return "Bloque de foto editado correctamente"

}