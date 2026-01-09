import { createNewsService } from "../services/news.create.services.js";
import { getNewsJournalistService } from "../services/news.get.journalist.services.js";
import { newsSendToCheckService } from "../services/news.send.to.check.services.js";
import { newsBlockCreateService } from "../services/news.block.create.services.js";
import { newsListPreviewJournalistService } from "../services/news.list.preview.journalist.services.js";
import { newsBlockCreatePhotoService } from "../services/news.block.create.photo.services.js";
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

        return res.status(500).json({ message: "Error al obtener las noticias del periodista", error: error.message });
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
