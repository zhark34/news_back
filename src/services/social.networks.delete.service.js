import Journalist from "../models/journalist.js";
import SocialNetworks from "../models/social.networks.js";
import { validatePassword } from "../utils/validate.password.js";

export const deleteSocialNetworkJournalistService = async (id, journalist_id, password) => {

    const checkJournalist = await Journalist.findOne({where: {journalist_id}})

    if (!checkJournalist){
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    const checkPassword = validatePassword(password, checkJournalist.password);

    if(!checkPassword){
        throw new Error("WRONG_PASSWORD");
    }

    const existingNetwork = await SocialNetworks.findOne({where: {id, journalist_id}});

    if (!existingNetwork) {
        throw new Error("SOCIAL_NETWORK_NOT_FOUND_OR_UNAUTHORIZED");
    }

    await existingNetwork.destroy();

    return "Red social eliminada"

}