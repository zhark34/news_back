import Session from "../models/sessions.js";
import Journalist from "../models/journalist.js";
import { hashRefreshToken } from "../utils/hash.refresh.token.js";
import { generateToken } from "../utils/generate.token.js";
import { generateRefreshToken } from "../utils/generate.refresh.token.js";

export const refreshToken = async (req, res, next) => {

    const oldRefreshToken = req.cookies.refresh_token;

    if (!oldRefreshToken) {
        return res.status(401).json({ message: "No estás autorizado (falta refreshToken)" });
    }

    try {

        const oldRefreshTokenHash = hashRefreshToken(oldRefreshToken);

        const session = await Session.findOne({

            where: {

                refresh_token_hash: oldRefreshTokenHash,
                revoked: false

            }

        })

        if (!session) {
            return res.status(401).json({ message: "Sesión inválida o expirada" });
        }

        if (new Date(session.expires_at) < new Date()) {
            await Session.destroy({ where: { refresh_token_hash: oldRefreshTokenHash } })
            return res.status(401).json({ message: "Sesión inválida o expirada" });
        }

        const journalist = await Journalist.findOne({
            where: { journalist_id: session.journalist_id }
        });

        if (!journalist) {
            return res.status(401).json({ message: "Periodista no encontrado" });
        }

        const newToken = generateToken({
            journalist_id: journalist.journalist_id,
            email: journalist.email,
            role: journalist.role,
            id_token: session.id_token
        });

        // Generar NUEVO REFRESH TOKEN
        const { refreshToken: newRefreshToken, hashed: newRefreshTokenHash } = generateRefreshToken();

        // Actualizar la sesión con el nuevo refresh token
        await session.update({
            refresh_token_hash: newRefreshTokenHash,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        // Enviar ambos tokens en cookies
        res.cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        next();

    } catch (error) {
        console.error("Error en refreshToken:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }

}