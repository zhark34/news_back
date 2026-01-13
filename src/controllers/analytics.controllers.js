import { createEventService } from "../services/analytics.events.services.js";


export const createEvent = async (req, res) => {

    try {

        const { event } = req.body;

        const eventCreated = await createEventService(event);

        return res.status(201).json(eventCreated);

    } catch (error) {
        return res.status(500).json({ message: "Error al crear el evento" });
    }

}