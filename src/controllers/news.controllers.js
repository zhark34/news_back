import { createNewsService } from "../services/news.create.services.js";
import { getNewsJournalistService } from "../services/news.get.journalist.services.js";

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
