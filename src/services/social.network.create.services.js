import Journalist from "../models/journalist.js"
import SocialNetworks from "../models/social.networks.js"
import { validatePassword } from "../utils/validate.password.js";

export const createSocialNetworkJournalistService = async(journalist_id, social_network, link_social_network, password) => {

    const journalist = await Journalist.findOne({where: {journalist_id}});

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const check = validatePassword(password, journalist.password);

    if(!check){
        throw new Error("WRONG_PASSWORD");
    }

    const existingNetwork = await SocialNetworks.findOne({where: {journalist_id, social_network}});

    if (existingNetwork) {
        throw new Error("SOCIAL_NETWORK_ALREADY_EXIST");
    }

    await SocialNetworks.create({journalist_id, social_network, link_social_network})

    return "Red social agregada"

}