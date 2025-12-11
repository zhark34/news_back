import Journalist from "../models/journalist.js";

export const validateJournalistServices = async (id, email, role) => {

    const journalist = await Journalist.findOne({
        where: { journalist_id: id, email, role }
    });

    if (!journalist) {
        throw new Error("JOURNALIST_NOT_FOUND");
    }

    return journalist;
};
