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
import { updatePhotoJournalistServices } from "../services/journalist.update.photo.services.js"
import { updatePasswordJournalistServices } from "../services/journalist.update.password.services.js"
import { getOneJournalistFilterServices } from "../services/journalist.get.filter.services.js"
import { validateJournalistServices } from "../services/journalist.validate.services.js"
import { logoutJournalistServices } from "../services/journalist.logout.services.js"
import { deleteJournalistServices } from "../services/journalist.delete.services.js"
import { getDeviceInfo } from "../utils/get.user.agent.js"
import { getIp } from "../utils/get.user.ip.js"
import fs from 'fs-extra';

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

    const device = getDeviceInfo(req);

    const {ip, country, province, city} = getIp(req);

    try{

        const journalist = await loginJournalistServices(email, password, device, ip, country, province, city);

        res.cookie('token', journalist.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 3600000
        });
        res.cookie('refresh_token', journalist.refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Periodista autenticado con éxito",
            id: journalist.id,
            name: journalist.name,
            role: journalist.role,
            photo: journalist.photo
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
        
        return res.status(500).json({ message: "Error del servidor al enviar el mail" });
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

        return res.status(500).json({ message: "Error del servidor al restablecer la contraseña" });
    }
};


export const updateNameJournalist = async (req, res, next) =>{

    const {name, password} = req.body;

    const id = req.user.journalist_id;

    try{

        const journalist = await updateNameJournalistServices(id, name, password);

        
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

        return res.status(500).json({ message: "Error del servidor al actualizar el nombre" });
    }

}

export const updateBioJournalist = async (req, res, next) =>{

    const {bio, password} = req.body;

    const id = req.user.journalist_id;

    try{

        const journalist = await updateBioJournalistServices(id, bio, password);

        
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

        return res.status(500).json({ message: "Error del servidor al actualizar la biograia" });
    }

}

export const updateEmailJournalist = async (req, res, next) =>{

    const {newEmail, password} = req.body;

    const id = req.user.journalist_id;

    try{

        const journalist = await updateEmailJournalistServices(id, newEmail, password);

        
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

        return res.status(500).json({ message: "Error del servidor al actualizar el email" });
    }

}

export const updateRoleJournalist = async (req, res, next) =>{

    const {id} = req.params;

    const role = req.user.role;

    try{

        const journalist = await updateRoleJournalistServices(id, role);

        
        return res.status(200).json({
            message: "Rol cambiado con exito",
            journalist
        });

    }catch (error) {
        console.error(error);
        
        if (error.message === "JOURNALITS_NO_EXIST") {
            return res.status(404).json({ message: "El periodista no está registrado" });
        }

        return res.status(500).json({ message: "Error del servidor al actualizar el rol" });
    }

}

export const updatePhotoJournalist = async (req, res, next) =>{

    const {password} = req.body;

    const id = req.user.journalist_id;

    const photo = req.file;

    try{

        if (!photo) {
            return res.status(400).json({ message: "No se ha proporcionado ninguna imagen" });
        }

        const journalist = await updatePhotoJournalistServices(id, password, photo.path);

        
        return res.status(200).json({
            message: "Foto de perfil actualizada con éxito",
            journalist
        });

    }catch (error) {
        console.error(error);
        
        if (error.message === "JOURNALITS_NO_EXIST") {
            return res.status(404).json({ message: "El periodista no está registrado" });
        }

        if (error.message === "WRONG_PASSWORD") {
            return res.status(401).json({ message: "Contraseña errónea, pruebe de vuelta" });
        }

        return res.status(500).json({ message: "Error del servidor al cargar la foto" });
    }finally {
        if (req.file && req.file.path) {
            await fs.unlink(req.file.path).catch(err => console.error("Error borrando temporal:", err));
        }
    }

}

export const updatePasswordJournalist = async (req, res, next) =>{

    const { password, newPassword } = req.body;

    const id = req.user.journalist_id;

    try{

        const journalist = await updatePasswordJournalistServices(id, password, newPassword);

        return res.status(200).json({
            message: "Contraseña cambiada con exito",
            journalist
        });

    } catch (error) {
        console.error(error);
        
        if (error.message === "JOURNALITS_NO_EXIST") {
            return res.status(409).json({ message: "El periodista no está registrado" });
        }

        if (error.message === "WRONG_PASSWORD") {
            return res.status(409).json({ message: "Contraseña errónea, pruebe de vuelta" });
        }

        return res.status(500).json({ message: "Error del servidor al actualizar contraseña" });
    }
};


export const getOneJournalistFilter = async (req, res, next) =>{

    const filters = req.query;

    try{

        const journalist = await getOneJournalistFilterServices(filters);

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

export const validateJournalistFilter = async (req, res, next) =>{

    const id = req.user.journalist_id;

    const refreshToken = req.cookies.refresh_token

    try{

        const journalist = await validateJournalistServices(id, refreshToken);

        return res.status(200).json({
            message: "OK",
            journalist
        });

    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({message: "No se encontró el periodista con la ID indicada"});
        }

        if (error.message === "INVALID_REFRESH_TOKEN") {
            return res.status(401).json({message: "Refresh token inválido"});
        }

        if (error.message === "REFRESH_TOKEN_EXPIRED") {
            return res.status(401).json({message: "El refresh token expiró"});
        }

        if (error.message === "DISABLED_TOKEN") {
            return res.status(401).json({message: "El refresh token fue revocado"});
        }

        if (error.message === "ID_DOES_NOT_MATCH") {
            return res.status(403).json({message: "La sesión no coincide con el usuario"});
        }

        return res.status(500).json({ message: "Error al validar el periodista" });
    }
};

export const deleteJournalist = async (req, res, next) =>{

    const adminId = req.user.journalist_id;

    const { id } = req.params;

    try{

        const journalist = await deleteJournalistServices(adminId, id);

        return res.status(200).json({
            message: "Periodista eliminado",
            journalist
        });

    } catch (error) {
        console.error(error);

        if (error.message === "NO_JOURNALIST_FOUND") {
            return res.status(404).json({ message: "No se encontró el periodista con la id indicada" });
        }

        if (error.message === "USER_NO_AUTHORIZED") {
            return res.status(401).json({ message: "No tenes el rango para eliminar periodista" });
        }

        if (error.message === "JOURNALIST_TO_BE_REMOVED_NOT_FOUND") {
            return res.status(401).json({ message: "No se encontró el periodista a eliminar" });
        }

        return res.status(500).json({ message: "Error al eliminar el periodista" });
    }
};

export const logoutJournalist = async (req, res, next) =>{

    const id = req.user.journalist_id;

    const refreshToken = req.cookies.refresh_token

    try{

        const journalist = await logoutJournalistServices(id, refreshToken);

        return res.status(200).json({
            message: "Sesion cerrada",
            journalist
        });

    } catch (error) {

        if (error.message === "JOURNALIST_NOT_FOUND") {
            return res.status(404).json({message: "No se encontró el periodista con la ID indicada"});
        }

        if (error.message === "INVALID_REFRESH_TOKEN") {
            return res.status(401).json({message: "Refresh token inválido"});
        }

        if (error.message === "ID_DOES_NOT_MATCH") {
            return res.status(403).json({message: "La sesión no coincide con el usuario"});
        }

        return res.status(500).json({ message: "Error al cerrar sesion" });

    }

}

