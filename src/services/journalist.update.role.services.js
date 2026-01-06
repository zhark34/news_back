import Journalist from "../models/journalist.js";

export const updateRoleJournalistServices = async (journalist_id, role, admin_id) => {

    const checkJournalist = await Journalist.findOne({ where: { journalist_id } })

    if (!checkJournalist) {

        throw new Error("JOURNALITS_NO_EXIST");

    }

    const checkAdmin = await Journalist.findOne({ where: { journalist_id: admin_id } })

    if (!checkAdmin) {

        throw new Error("ADMIN_NO_EXIST");

    }

    if (checkAdmin.role !== "admin") {

        throw new Error("ADMIN_NO_AUTH");

    }

    checkJournalist.role = role;

    await checkJournalist.save();

    return "Actualizado"

}