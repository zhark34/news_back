import Journalist from "../models/journalist.js";
import Session from "../models/sessions.js";
import { hashRefreshToken } from "../utils/hash.refresh.token.js";

export const validateJournalistServices = async (id, refreshToken) => {

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

    if (new Date(session.expires_at) < new Date()) {
        await Session.destroy({where: {refresh_token_hash: refreshTokenHash}})
        throw new Error("REFRESH_TOKEN_EXPIRED");
    }

    if (session.revoke === true) {
        await Session.destroy({where: {refresh_token_hash: refreshTokenHash}})
        throw new Error("DISABLED_TOKEN");
    }

    if (journalist.journalist_id !== session.journalist_id){

        throw new Error("ID_DOES_NOT_MATCH");

    }

    return {
        
        id: journalist.journalist_id,
        name: journalist.name,
        bio: journalist.bio,
        photo: journalist.profile_image_url,
        role: journalist.role

    };
};
