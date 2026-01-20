import { createEventService } from "../services/analytics.events.services.js";
import { getNewsMetricsService } from "../services/analytics.metrics.services.js";
import { getNewsMetricsByNewsService } from "../services/analytics.metrics.by.news.services.js";
import { getRankingJournalistService } from "../services/analytics.metrics.journalist.services.js";
import { getReadingsService } from "../services/analytics.metrics.readings.services.js";


export const createEvent = async (req, res) => {

    try {

        const { event } = req.body;

        const eventCreated = await createEventService(event);

        return res.status(201).json(eventCreated);

    } catch (error) {
        return res.status(500).json({ message: "Error al crear el evento" });
    }

}

export const getNewsMetrics = async (req, res) => {

    try {

        const eventCreated = await getNewsMetricsService();

        return res.status(201).json(eventCreated);

    } catch (error) {
        return res.status(500).json({ message: "Error al crear el evento" });
    }

}

export const getNewsMetricsByNews = async (req, res) => {

    const { id } = req.params;

    try {

        const eventCreated = await getNewsMetricsByNewsService(id);

        return res.status(201).json(eventCreated);

    } catch (error) {
        return res.status(500).json({ message: "Error al crear el evento" });
    }

}

export const getRankingJournalist = async (req, res) => {

    try {

        const eventCreated = await getRankingJournalistService();

        return res.status(201).json(eventCreated);

    } catch (error) {
        return res.status(500).json({ message: "Error al crear el evento" });
    }

}

export const getReadings = async (req, res) => {

    try {

        const eventCreated = await getReadingsService();

        return res.status(201).json(eventCreated);

    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las lecturas" });
    }

}
