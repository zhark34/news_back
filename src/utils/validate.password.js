import bcrypt from "bcrypt";

export const validatePassword = async (password, dbPassword) => {
    return bcrypt.compare(password, dbPassword);
};