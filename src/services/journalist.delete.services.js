import Journalist from "../models/journalist.js";

export const deleteJournalistServices = async (adminId, id) =>{

    const journalist = await Journalist.findOne({ where: { journalist_id: adminId } });

    if(!journalist){

        throw new Error("NO_JOURNALIST_FOUND");

    }

    if(journalist.role !== "admin") {

        throw new Error("USER_NO_AUTHORIZED");

    }

    const dataDelete = Journalist.findOne({ journalist_id: id })

    if(!dataDelete){

        throw new Error("JOURNALIST_TO_BE_REMOVED_NOT_FOUND");

    }

    await Journalist.destroy({where: { journalist_id: id }})

    return "Periodista eliminado"

}