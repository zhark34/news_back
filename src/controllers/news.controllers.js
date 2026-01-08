import { createNewsService } from "../services/news.services.js";

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
    }
};