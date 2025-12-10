import bcrypt from "bcrypt";

export const hashPassword = async (password) => {

    const salt = await bcrypt.genSalt(12);

    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword

}