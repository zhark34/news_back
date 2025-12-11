import { getAllJournalistServices } from "../services/journalist.get.all.services.js"
import { getOneJournalistServices } from "../services/journalist.get.one.services.js"
import { createJournalistServices } from "../services/journalist.create.services.js"
import { loginJournalistServices } from "../services/journalist.login.services.js"
import { forgetPasswordJournalistServices } from "../services/journalist.forget.password.services.js"
import { resetPasswordJournalistServices } from "../services/journalist.reset.password.services.js"
import { updateNameJournalistServices } from "../services/journalist.update.name.services.js"
import { updateBioJournalistServices } from "../services/journalist.update.bio.services.js"
import { updateEmailJournalistServices } from "../services/journalist.update.email.services.js"
import { updateRoleJournalistServices } from "../services/journalist.update.role.services.js"

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

export const loginJournalist = async (req, res, next) =>{

    const { email, password } = req.body;

    try{

        const journalist = await loginJournalistServices(email, password);

        return res.status(200).json({
            message: "Periodista autenticado con éxito",
            journalist
        });

    } catch (error) {
        console.error(error);

        if (error.message === "JOURNALITS_NO_EXIST") {
            return res.status(404).json({ message: "El periodista no está registrado" });
        }
        
        if (error.message === "WRONG_PASSWORD") {
            return res.status(409).json({ message: "Contraseña errónea, pruebe de vuelta" });
        }

        return res.status(500).json({ message: "Error del servidor al ingresar" });
    }
};

export const forgetPasswordJournalist = async (req, res, next) =>{

    const { email } = req.body;

    try{

        const journalist = await forgetPasswordJournalistServices(email);

        return res.status(200).json({
            message: "Revisa tu email y segui los pasos",
            journalist
        });

    } catch (error) {
        console.error(error);

        if (error.message === "JOURNALIST_NO_EXIST") {
            return res.status(404).json({ message: "El periodista no está registrado" });
        }
        
        return res.status(500).json({ message: "Error del servidor al ingresar" });
    }
};

export const resetPasswordJournalist = async (req, res, next) =>{

    const { token, password } = req.body;

    try{

        const journalist = await resetPasswordJournalistServices(token, password);

        return res.status(200).json({
            message: "Contraseña cambiada con exito",
            journalist
        });

    } catch (error) {
        console.error(error);
        
        if (error.message === "TOKEN_EXPIRED") {
            return res.status(409).json({ message: "El token ya no es válido" });
        }

        return res.status(500).json({ message: "Error del servidor al ingresar" });
    }
};


export const updateNameJournalist = async (req, res, next) =>{

    const {email, name, password} = req.body;

    try{

        const journalist = await updateNameJournalistServices(email, name, password);

        
        return res.status(200).json({
            message: "Nombre cambiado con exito",
            journalist
        });

    }catch (error) {
        console.error(error);
        
        if (error.message === "JOURNALITS_NO_EXIST") {
            return res.status(404).json({ message: "El periodista no está registrado" });
        }
        
        if (error.message === "WRONG_PASSWORD") {
            return res.status(409).json({ message: "Contraseña errónea, pruebe de vuelta" });
        }

        return res.status(500).json({ message: "Error del servidor al ingresar" });
    }

}

export const updateBioJournalist = async (req, res, next) =>{

    const {email, bio, password} = req.body;

    try{

        const journalist = await updateBioJournalistServices(email, bio, password);

        
        return res.status(200).json({
            message: "Biografia cambiada con exito",
            journalist
        });

    }catch (error) {
        console.error(error);
        
        if (error.message === "JOURNALITS_NO_EXIST") {
            return res.status(404).json({ message: "El periodista no está registrado" });
        }
        
        if (error.message === "WRONG_PASSWORD") {
            return res.status(409).json({ message: "Contraseña errónea, pruebe de vuelta" });
        }

        return res.status(500).json({ message: "Error del servidor al ingresar" });
    }

}

export const updateEmailJournalist = async (req, res, next) =>{

    const {email, newEmail, password} = req.body;

    try{

        const journalist = await updateEmailJournalistServices(email, newEmail, password);

        
        return res.status(200).json({
            message: "Email cambiada con exito",
            journalist
        });

    }catch (error) {
        console.error(error);
        
        if (error.message === "JOURNALITS_NO_EXIST") {
            return res.status(404).json({ message: "El periodista no está registrado" });
        }
        
        if (error.message === "WRONG_PASSWORD") {
            return res.status(409).json({ message: "Contraseña errónea, pruebe de vuelta" });
        }

        if (error.message === "EMAIL_ALREADY_REGISTERED") {
            return res.status(409).json({ message: "El email ya está registrado, prueba con otro" });
        }

        return res.status(500).json({ message: "Error del servidor al ingresar" });
    }

}

export const updateRoleJournalist = async (req, res, next) =>{

    const {journalist_id, role} = req.body;

    try{

        const journalist = await updateRoleJournalistServices(journalist_id, role);

        
        return res.status(200).json({
            message: "Rol cambiado con exito",
            journalist
        });

    }catch (error) {
        console.error(error);
        
        if (error.message === "JOURNALITS_NO_EXIST") {
            return res.status(404).json({ message: "El periodista no está registrado" });
        }

        return res.status(500).json({ message: "Error del servidor al ingresar" });
    }

}