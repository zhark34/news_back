import Journalist from "../models/journalist.js"
import { validatePassword } from "../utils/validate.password.js";
import { sendEmail } from "../config/nodemailer.js";
import { emailChangedNotification } from "../utils/email_templates/email.update.js";

export const updateEmailJournalistServices = async (id, newEmail, password) =>{


    const checkJournalist = await Journalist.findOne({where: { journalist_id: id }})

    if(!checkJournalist){

        throw new Error("JOURNALITS_NO_EXIST");

    }

    const passwordValidation = await validatePassword(password, checkJournalist.password);

    if(!passwordValidation){

        throw new Error("WRONG_PASSWORD");

    }

    const checkJournalist2 = await Journalist.findOne({where: { email: newEmail }})

    if(checkJournalist2){

        throw new Error("EMAIL_ALREADY_REGISTERED");

    }

    const oldEmail = checkJournalist.email;

    checkJournalist.email = newEmail;

    await checkJournalist.save();

    sendEmail({

        to: oldEmail,
        subject: "Alerta de seguridad",
        html: emailChangedNotification(checkJournalist.name, newEmail, "sdabfjkabsnfja/contacto")

    })

    return "Actualizado"

}