import Journalist from "../models/journalist.js";
import Session from "../models/sessions.js";
import { hashRefreshToken } from "../utils/hash.refresh.token.js";

export const logoutJournalistServices = async (id, refreshToken) => {

    const journalist = await Journalist.findOne({
        where: { journalist_id: id }
    });

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const refreshTokenHash = hashRefreshToken(refreshToken);

    const session = await Session.findOne({

        where: {

            refresh_token_hash: refreshTokenHash

        }

    })

    if (!session) {
        throw new Error("INVALID_REFRESH_TOKEN");
    }

    if (session.journalist_id !== journalist.journalist_id) {
        throw new Error("ID_DOES_NOT_MATCH");
    }

    await Session.destroy({where: {refresh_token_hash: refreshTokenHash}})

    return "Sesion eliminada"

}