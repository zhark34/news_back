import Journalist from "../models/journalist.js";

export const updateRoleJournalistServices = async (journalist_id, role) => {

    const checkJournalist = await Journalist.findOne({where: { journalist_id }})

    if(!checkJournalist){

        throw new Error("JOURNALITS_NO_EXIST");

    }

    checkJournalist.role = role;

    await checkJournalist.save();

    return "Actualizado"

}