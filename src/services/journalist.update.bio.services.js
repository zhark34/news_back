import Journalist from "../models/journalist.js"
import { validatePassword } from "../utils/validate.password.js";

export const updateBioJournalistServices = async (id, bio, password) =>{

    const checkJournalist = await Journalist.findOne({where: { journalist_id: id }})

    if(!checkJournalist){

        throw new Error("JOURNALITS_NO_EXIST");

    }

    const passwordValidation = await validatePassword(password, checkJournalist.password);

    if(!passwordValidation){

        throw new Error("WRONG_PASSWORD");

    }

    checkJournalist.bio = bio;

    await checkJournalist.save();

    return "Actualizado"

}