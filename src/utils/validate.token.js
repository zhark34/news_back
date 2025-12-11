import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

export const validateToken = (token) => {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        return null;
    }

};