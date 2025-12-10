import Journalist from "../models/journalist.js"
import { generateTokenTemporal } from "../utils/generate.token.link.js";
import { passwordTokenEmail } from "../utils/email_templates/journalist.forget.password.js";
import { sendEmail } from "../config/nodemailer.js";

export const forgetPasswordJournalistServices = async (email) =>{

    const checkEmail = await Journalist.findOne({where: { email }});

    if(!checkEmail){

        throw new Error("JOURNALIST_NO_EXIST");

    }

    const { rawToken, hashed } = generateTokenTemporal();

    await Journalist.update({
        reset_token: hashed,
        reset_token_expire: Date.now() + 15 * 60 * 1000
    }, {
        where: { email }
    });

    await sendEmail({
    
        to: email,
        subject: "Restablece tu contraseña",
        html: await passwordTokenEmail(checkEmail.name, `https://tu-pagina.com/${rawToken}`)

    })

    return "Email enviado"

}