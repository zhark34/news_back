import Journalist from "../models/journalist.js"
import SocialNetworks from "../models/social.networks.js"
import { validatePassword } from "../utils/validate.password.js";

export const updateSocialNetworkJournalistService = async(journalist_id, id, social_network, link_social_network, password) => {

    const journalist = await Journalist.findOne({where: {journalist_id}});

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const check = validatePassword(password, journalist.password);

    if(!check){
        throw new Error("WRONG_PASSWORD");
    }

    const existingNetwork = await SocialNetworks.findOne({where: {id}});

    if (!existingNetwork) {
        
        throw new Error("SOCIAL_NETWORK_NO_EXIST");
    }

    existingNetwork.social_network = social_network;
    existingNetwork.link_social_network = link_social_network;

    await existingNetwork.save()

    return "Red social actualizada"

}