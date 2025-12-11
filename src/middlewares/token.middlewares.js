import {validateToken} from '../utils/validate.token.js'

export const tokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No estás autorizado (falta token)" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Formato de token inválido" });
    }

    const token = parts[1];

    try {
        const decoded = validateToken(token);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};
