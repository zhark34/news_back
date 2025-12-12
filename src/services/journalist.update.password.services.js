import Journalist from "../models/journalist.js"
import { validatePassword } from "../utils/validate.password.js";
import { hashPassword } from "../utils/hash.password.js";
import { sendEmail } from "../config/nodemailer.js";
import { passwordChangedEmail } from "../utils/email_templates/email.recovery.password.js";

export const updatePasswordJournalistServices = async (id, password, newPassword) =>{

    const checkJournalist = await Journalist.findOne({where: { journalist_id: id }})

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

    sendEmail({

        to: checkJournalist.email,
        subject: "Alerta de seguridad",
        html: passwordChangedEmail(checkJournalist.name, "lshjfkhasdfg/ckeck")

    })

    return "Actualizado"

}