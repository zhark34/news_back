import Session from "../models/sessions.js";

export const deleteSessionService = async (session_id, journalist_id) => {

    const session = await Session.destroy({ where: { id_token: session_id, journalist_id } });

    if (!session) {
        throw new Error("SESSION_NOT_FOUND");
    }

    return session;

}