import { getPublicNewsByCategoryService } from "../services/public.news.services.js";
import { getPublicNewsByTitleService } from "../services/public.news.by.title.services.js";
import { getLatestNewsService } from "../services/public.news.latest.services.js";
import { getNewsByScoreService } from "../services/public.news.by.score.services.js";

export const getPublicNewsByCategory = async (req, res) => {

    const { category } = req.params;

    try {

        const news = await getPublicNewsByCategoryService(category);

        res.status(200).json(news);

    } catch (error) {

        if (error.message === "NOT_NEWS_FOUND") {
            return res.status(404).json({ message: "No se encontraron noticias" });
        }

        return res.status(500).json({ message: "Error al obtener las noticias" });
    }

}

export const getPublicNewsByTitle = async (req, res) => {

    const { title } = req.params;

    const decodedTitle = title.replace(/-/g, " ");

    console.log(decodedTitle);

    try {

        const news = await getPublicNewsByTitleService(decodedTitle);

        res.status(200).json(news);

    } catch (error) {

        if (error.message === "NOT_NEWS_FOUND") {
            return res.status(404).json({ message: "No se encontraron noticias" });
        }

        return res.status(500).json({ message: "Error al obtener las noticias" });
    }

}

export const getLatestNews = async (req, res) => {

    try {

        const news = await getLatestNewsService();

        res.status(200).json(news);

    } catch (error) {

        if (error.message === "NOT_NEWS_FOUND") {
            return res.status(404).json({ message: "No se encontraron noticias" });
        }

        return res.status(500).json({ message: "Error al obtener las noticias" });
    }

}

export const getNewsByScore = async (req, res) => {

    const { category } = req.params;

    try {

        const news = await getNewsByScoreService(category);

        res.status(200).json(news);

    } catch (error) {

        if (error.message === "NOT_NEWS_FOUND") {
            return res.status(404).json({ message: "No se encontraron noticias" });
        }

        return res.status(500).json({ message: "Error al obtener las noticias" });
    }

}
