import Journalist from "../models/journalist.js"
import { validatePassword } from "../utils/validate.password.js";

export const updateNameJournalistServices = async (id, name, password) =>{

    const checkJournalist = await Journalist.findOne({where: { journalist_id: id }})

    if(!checkJournalist){

        throw new Error("JOURNALITS_NO_EXIST");

    }

    const passwordValidation = await validatePassword(password, checkJournalist.password);

    if(!passwordValidation){

        throw new Error("WRONG_PASSWORD");

    }

    checkJournalist.name = name;

    await checkJournalist.save();

    return name

}