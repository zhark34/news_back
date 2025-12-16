import { getOneJournalistSocialNetworkServices } from '../services/social.networks.get.one.service.js';
import { createSocialNetworkJournalistService } from '../services/social.network.create.services.js';
import { updateSocialNetworkJournalistService } from '../services/social.networks.update.service.js';
import { deleteSocialNetworkJournalistService } from '../services/social.networks.delete.service.js'

export const getOneJournalistSocialNetwork = async (req, res, next) =>{

    const {id} = req.params;

    try{

        const SocialNetworks = await getOneJournalistSocialNetworkServices(id);

        return res.status(200).json({
            message: "OK",
            SocialNetworks
        });

    } catch (error) {
        console.error(error);

        if (error.message === "NO_JOURNALIST_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la id indicada" });
        }

        return res.status(500).json({ message: "Error al obtener los periodistas" });
    }
};

export const createSocialNetworkJournalist = async (req, res, next) =>{

    const journalist_id = req.user.journalist_id;

    const { social_network, link_social_network, password } = req.body;

    console.log(social_network, link_social_network)

    try {

        const createSocialNetwork = await createSocialNetworkJournalistService(journalist_id, social_network, link_social_network, password);

        return res.status(200).json({
            message: createSocialNetwork
        });

    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({message: "No se encontró el periodista con la ID indicada"});
        }
        
        if (error.message === "WRONG_PASSWORD") {
            return res.status(401).json({ message: "Contraseña errónea, pruebe de vuelta" });
        }

        if (error.message === "SOCIAL_NETWORK_ALREADY_EXIST") {
            return res.status(401).json({message: "Ya existe la red social"});
        }

        return res.status(500).json({ message: "Error al agregar la red social" });

    }

}

export const updateSocialNetworkJournalist = async (req, res, next) =>{

    const journalist_id = req.user.journalist_id;

    const { id, social_network, link_social_network, password } = req.body;

    try{

        const updateSocialNetwork = await updateSocialNetworkJournalistService(journalist_id, id, social_network, link_social_network, password);

        return res.status(200).json({
            message: updateSocialNetwork
        });

    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({message: "No se encontró el periodista con la ID indicada"});
        }
        
        if (error.message === "WRONG_PASSWORD") {
            return res.status(401).json({ message: "Contraseña errónea, pruebe de vuelta" });
        }
        if (error.message === "SOCIAL_NETWORK_NO_EXIST") {
            return res.status(401).json({message: "No existe la red social que se quiere actualizar"});
        }

        return res.status(500).json({ message: "Error al agregar la red social" });

    }

}

export const deleteSocialNetworkJournalist = async (req, res, next) =>{

    const journalist_id = req.user.journalist_id;

    const { password } = req.body;

    const { id } = req.params;

    try{

        const updateSocialNetwork = await deleteSocialNetworkJournalistService(id, journalist_id, password);

        return res.status(200).json({
            message: updateSocialNetwork
        });

    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({message: "No se encontró el periodista con la ID indicada"});
        }
        
        if (error.message === "WRONG_PASSWORD") {
            return res.status(401).json({ message: "Contraseña errónea, pruebe de vuelta" });
        }
        if (error.message === "SOCIAL_NETWORK_NO_EXIST") {
            return res.status(401).json({message: "No existe la red social que se quiere actualizar"});
        }

        return res.status(500).json({ message: "Error al agregar la red social" });

    }

}