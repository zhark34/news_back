import Journalist from "../models/journalist.js"
import { validatePassword } from "../utils/validate.password.js";
import { hashPassword } from "../utils/hash.password.js";

export const updatePasswordJournalistServices = async (email, password, newPassword) =>{

    const checkJournalist = await Journalist.findOne({where: { email }})

    if(!checkJournalist){

        throw new Error("JOURNALITS_NO_EXIST");

    }

    const passwordValidation = await validatePassword(password, checkJournalist.password);

    if(!passwordValidation){

        throw new Error("WRONG_PASSWORD");

    }

    const newPw = await hashPassword(newPassword)

    checkJournalist.password = newPw;

    await checkJournalist.save();

    return "Actualizado"

}