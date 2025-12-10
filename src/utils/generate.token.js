import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET
const expire = process.env.JWT_EXPIRES_IN

export const generateToken = (payload) => {
    return jwt.sign(
        payload,
        secret,
        { expiresIn: expire }
    );
};
