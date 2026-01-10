import { createNewsService } from "../services/news.create.services.js";
import { getNewsJournalistService } from "../services/news.get.journalist.services.js";
import { newsSendToCheckService } from "../services/news.send.to.check.services.js";
import { newsBlockCreateService } from "../services/news.block.create.services.js";
import { newsListPreviewJournalistService } from "../services/news.list.preview.journalist.services.js";
import { newsBlockCreatePhotoService } from "../services/news.block.create.photo.services.js";
import { newsBlockCreateVideoService } from "../services/news.block.create.video.services.js";
import { newsBlockUpdateService } from "../services/news.block.update.services.js";
import { newsEditService } from "../services/news.edit.services.js";
import { newsEditPhotoService } from "../services/news.edit.photo.services.js";
import { newsEditVideoService } from "../services/news.edit.video.services.js";
import { newsBlockDeleteService } from "../services/news.block.delete.services.js";
import { newsDeleteService } from "../services/news.delete.services.js";
import { newsModerateListService } from "../services/news.moderate.list.services.js";
import { newsListPreviewAdminService } from "../services/news.list.preview.admin.services.js";
import fs from 'fs-extra';

export const createNews = async (req, res) => {

    const { title, category, action } = req.body;

    const photo = req.file;

    const journalistId = req.user.journalist_id;

    try {

        if (!photo) {
            return res.status(400).json({ message: "No se ha proporcionado ninguna imagen" });
        }

        const news = await createNewsService(title, category, photo.path, journalistId, action)

        return res.status(200).json({
            message: "OK",
            news
        });
    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        return res.status(500).json({ message: "Error al crear la noticia", error: error.message });
    } finally {
        if (req.file && req.file.path) {
            await fs.unlink(req.file.path).catch(err => console.error("Error borrando temporal:", err));
        }
    }
};

export const getNewsJournalist = async (req, res) => {

    const journalistId = req.user.journalist_id;

    const status = req.params.status;

    try {

        const news = await getNewsJournalistService(journalistId, status);

        return res.status(200).json({
            message: "OK",
            news
        });

    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        if (error.message === "NO_NEWS_FOUND") {
            return res.status(404).json({ message: "No se encontraron noticias con el estado indicado" });
        }

        return res.status(500).json({ message: "Error al obtener las noticias del periodista", error: error.message });
    }
};

export const newsSendToCheck = async (req, res) => {

    const journalistId = req.user.journalist_id;
    const newsId = req.params.id;

    try {
        const news = await newsSendToCheckService(journalistId, newsId);

        return res.status(200).json({
            message: "OK",
            news
        });

    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        if (error.message === "NEWS_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la noticia con la ID indicada" });
        }

        return res.status(500).json({ message: "Error al obtener las noticias del periodista", error: error.message });
    }
};

export const newsBlockCreate = async (req, res) => {

    const journalistId = req.user.journalist_id;
    const action = req.params.action;
    const dataForm = req.body;

    try {
        const news = await newsBlockCreateService(journalistId, action, dataForm);

        return res.status(200).json({
            message: "OK",
            news
        });

    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        if (error.message === "NEWS_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la noticia con la ID indicada" });
        }

        return res.status(500).json({ message: "Error al crear el bloque", error: error.message });
    }
};

export const newsListPreviewJournalist = async (req, res) => {

    const journalistId = req.user.journalist_id;

    const idNews = req.params.id;

    try {
        const news = await newsListPreviewJournalistService(journalistId, idNews);

        return res.status(200).json({
            message: "OK",
            news
        });

    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        if (error.message === "NEWS_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la noticia con la ID indicada" });
        }

        if (error.message === "NOT_ALLOWED") {
            return res.status(403).json({ message: "No tienes permiso para acceder a esta noticia" });
        }

        return res.status(500).json({ message: "Error al obtener las noticias del periodista", error: error.message });
    }

}

export const newsBlockCreatePhoto = async (req, res) => {

    const journalistId = req.user.journalist_id;
    const { caption, photo_source, newsId, blockType, position } = req.body;
    const photo = req.file;

    try {

        const news = await newsBlockCreatePhotoService(journalistId, caption, photo_source, photo.path, newsId, blockType, position);

        return res.status(200).json({
            message: "OK",
            news
        });

    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        if (error.message === "NEWS_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la noticia con la ID indicada" });
        }

        if (error.message === "NOT_ALLOWED") {
            return res.status(403).json({ message: "No tienes permiso para modificar esta noticia" });
        }

        return res.status(500).json({ message: "Error al modificar la noticia", error: error.message });
    } finally {
        if (req.file && req.file.path) {
            await fs.unlink(req.file.path).catch(err => console.error("Error borrando temporal:", err));
        }
    }

}

export const newsBlockCreateVideo = async (req, res) => {

    const journalistId = req.user.journalist_id;
    const { caption, newsId, blockType, position } = req.body;
    const video = req.file;

    try {

        const news = await newsBlockCreateVideoService(journalistId, caption, video.path, newsId, blockType, position);

        return res.status(200).json({
            message: "OK",
            news
        });

    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        if (error.message === "NEWS_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la noticia con la ID indicada" });
        }

        if (error.message === "NOT_ALLOWED") {
            return res.status(403).json({ message: "No tienes permiso para modificar esta noticia" });
        }

        return res.status(500).json({ message: "Error al modificar la noticia", error: error.message });
    } finally {
        if (req.file && req.file.path) {
            await fs.unlink(req.file.path).catch(err => console.error("Error borrando temporal:", err));
        }
    }

}

export const newsBlockUpdate = async (req, res) => {

    const journalistId = req.user.journalist_id;
    const action = req.params.action;
    const dataForm = req.body;

    try {
        const news = await newsBlockUpdateService(journalistId, action, dataForm);

        return res.status(200).json({
            message: "OK",
            news
        });

    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        if (error.message === "NEWS_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la noticia con la ID indicada" });
        }

        if (error.message === "JOURNALIST_NOT_AUTHORIZED") {
            return res.status(403).json({ message: "No tienes permiso para modificar esta noticia" });
        }

        if (error.message === "BLOCK_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el bloque con la ID indicada" });
        }

        if (error.message === "PARAGRAPH_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el parrafo con la ID indicada" });
        }

        if (error.message === "QUOTE_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la cita con la ID indicada" });
        }

        if (error.message === "LIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la lista con la ID indicada" });
        }

        if (error.message === "LIST_ITEM_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el item de la lista con la ID indicada" });
        }

        if (error.message === "EMBED_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el embed con la ID indicada" });
        }

        if (error.message === "CAPTION_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el caption con la ID indicada" });
        }

        return res.status(500).json({ message: "Error al obtener las noticias del periodista", error: error.message });
    }
};

export const newsEdit = async (req, res) => {

    const { title, category, action, newsId, photo_id } = req.body;

    const photo = req.file;

    const journalistId = req.user.journalist_id;

    try {

        const news = await newsEditService(title, category, photo.path, journalistId, action, newsId, photo_id)

        return res.status(200).json({
            message: "OK",
            news
        });
    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        if (error.message === "NEWS_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la noticia con la ID indicada" });
        }

        return res.status(500).json({ message: "Error al editar la noticia", error: error.message });
    } finally {
        if (req.file && req.file.path) {
            await fs.unlink(req.file.path).catch(err => console.error("Error borrando temporal:", err));
        }
    }
};

export const newsEditPhoto = async (req, res) => {

    const { newsId, photo_id, caption, photo_source, position, blockId } = req.body;

    const photo = req.file;

    const journalistId = req.user.journalist_id;

    try {

        const news = await newsEditPhotoService(newsId, photo.path, journalistId, photo_id, caption, photo_source, position, blockId)

        return res.status(200).json({
            message: "OK",
            news
        });
    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        if (error.message === "NEWS_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la noticia con la ID indicada" });
        }

        if (error.message === "BLOCK_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el bloque con la ID indicada" });
        }

        if (error.message === "JOURNALIST_NOT_AUTHORIZED") {
            return res.status(403).json({ message: "No tienes permiso para modificar esta noticia" });
        }

        if (error.message === "PHOTO_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la foto con la ID indicada" });
        }

        return res.status(500).json({ message: "Error al editar la noticia", error: error.message });
    } finally {
        if (req.file && req.file.path) {
            await fs.unlink(req.file.path).catch(err => console.error("Error borrando temporal:", err));
        }
    }
};

export const newsEditVideo = async (req, res) => {

    const { newsId, video_id, caption, position, blockId } = req.body;

    const video = req.file;

    const journalistId = req.user.journalist_id;

    try {

        const news = await newsEditVideoService(newsId, video.path, journalistId, video_id, caption, position, blockId)

        return res.status(200).json({
            message: "OK",
            news
        });
    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        if (error.message === "NEWS_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la noticia con la ID indicada" });
        }

        if (error.message === "JOURNALIST_NOT_AUTHORIZED") {
            return res.status(403).json({ message: "No tienes permiso para modificar esta noticia" });
        }

        if (error.message === "BLOCK_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el bloque con la ID indicada" });
        }

        if (error.message === "VIDEO_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el video con la ID indicada" });
        }

        return res.status(500).json({ message: "Error al editar la noticia", error: error.message });
    } finally {
        if (req.file && req.file.path) {
            await fs.unlink(req.file.path).catch(err => console.error("Error borrando temporal:", err));
        }
    }
};

export const newsBlockDelete = async (req, res) => {

    const journalistId = req.user.journalist_id;
    const blockId = req.params.id;

    try {
        const news = await newsBlockDeleteService(journalistId, blockId);

        return res.status(200).json({
            message: "OK",
            news
        });
    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        if (error.message === "BLOCK_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el bloque con la ID indicada" });
        }

        if (error.message === "NEWS_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la noticia con la ID indicada" });
        }

        if (error.message === "NOT_ALLOWED") {
            return res.status(403).json({ message: "No tienes permiso para eliminar este bloque" });
        }

        return res.status(500).json({ message: "Error al eliminar el bloque", error: error.message });
    }
};

export const newsDelete = async (req, res) => {

    const journalistId = req.user.journalist_id;
    const newsId = req.params.id;

    try {
        const news = await newsDeleteService(journalistId, newsId);

        return res.status(200).json({
            message: "OK",
            news
        });
    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        return res.status(500).json({ message: "Error al eliminar la noticia", error: error.message });
    }
};

export const newsModerateList = async (req, res) => {

    const journalistId = req.user.journalist_id;

    try {
        const { news } = await newsModerateListService(journalistId);

        return res.status(200).json({
            message: "OK",
            news
        });
    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        return res.status(500).json({ message: "Error al obtener la lista de noticias", error: error.message });
    }
};

export const newsListPreviewAdmin = async (req, res) => {

    const journalistId = req.user.journalist_id;

    const newsId = req.params.id;

    try {
        const news = await newsListPreviewAdminService(journalistId, newsId);

        return res.status(200).json({
            message: "OK",
            news
        });
    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la ID indicada" });
        }

        if (error.message === "NEWS_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la noticia con la ID indicada" });
        }

        if (error.message === "NOT_ALLOWED") {
            return res.status(403).json({ message: "No tienes permiso para acceder a esta noticia" });
        }

        return res.status(500).json({ message: "Error al obtener la lista de noticias", error: error.message });
    }
};