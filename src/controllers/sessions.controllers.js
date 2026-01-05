import { getSessionService } from "../services/sessions.services.js";

export const getOneSession = async (req, res) => {

    const journalist_id = req.params.id;

    try {

        const session = await getSessionService(journalist_id);

        return res.status(200).json({
            message: "OK",
            session
        });

    } catch (error) {

        console.error(error);

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la id indicada" });
        }

        if (error.message === "SESSION_NOT_FOUND") {
            return res.status(404).json({ message: "No se encontró la sesión con la id indicada" });
        }

        return res.status(500).json({ message: "Error al obtener la sesión" });
    }

}