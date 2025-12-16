import SocialNetworks from "../models/social.networks.js"

export const getOneJournalistSocialNetworkServices = async (journalist_id) => {

    const findSocialNetworks = SocialNetworks.findAll({where:{journalist_id}})

    if(!findSocialNetworks){
        throw new Error("NO_JOURNALIST_FOUND");
    }

    return findSocialNetworks;

}