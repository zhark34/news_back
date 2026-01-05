import Journalist from '../models/journalist.js';
import Session from '../models/sessions.js';

export const getSessionService = async (journalist_id) => {

    const journalist = await Journalist.findOne({ were: { journalist_id } });

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const session = await Session.findAll({ where: { journalist_id } });

    if (!session) {
        throw new Error("SESSION_NOT_FOUND");
    }

    return session;
}