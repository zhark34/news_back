import {validateToken} from '../utils/validate.token.js'
import Session from '../models/sessions.js';

export const tokenMiddleware = async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No estás autorizado (falta token)" });
    }
    
    try {
        const decoded = validateToken(token);

        if (!decoded.id_token) {
            return res.status(401).json({ message: "Token sin sesión asociada" });
        }

        const session = await Session.findOne({
            where: {
                id_token: decoded.id_token,
                revoked: false
            }
        });

        if (!session) {
            return res.status(401).json({ message: "Sesión inválida o expirada" });
        }

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
