import { getAllJournalistServices } from "../services/journalist.get.all.services.js"
import { getOneJournalistServices } from "../services/journalist.get.one.services.js"
import { createJournalistServices } from "../services/journalist.create.services.js"

export const getAllJournalist = async (req, res, next) =>{

    try{

        const journalist = await getAllJournalistServices();

        return res.status(200).json({
            message: "OK",
            journalist
        });

    } catch (error) {
        console.error(error);

        if (error.message === "NO_JOURNALISTS_FOUND") {
            return res.status(404).json({ message: "No hay periodistas" });
        }

        return res.status(500).json({ message: "Error al obtener los periodistas" });
    }
};

export const getOneJournalist = async (req, res, next) =>{

    const {id} = req.params;

    try{

        const journalist = await getOneJournalistServices(id);

        return res.status(200).json({
            message: "OK",
            journalist
        });

    } catch (error) {
        console.error(error);

        if (error.message === "NO_JOURNALIST_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la id indicada" });
        }

        return res.status(500).json({ message: "Error al obtener los periodistas" });
    }
};

export const createJournalist = async (req, res, next) =>{

    const { name, email, role } = req.body;

    try{

        const journalist = await createJournalistServices(name, email, role);

        return res.status(201).json({
            message: "Periodista creado correctamente",
            journalist
        });

    } catch (error) {
        console.error(error);

        if (error.message === "JOURNALIST_EXIST") {
            return res.status(409).json({ message: "El periodista ya está registrado" });
        }
        
        return res.status(500).json({ message: "Error al intentar registrar al periodista" });
    }
};