import Journalist from "../models/journalist.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { passwordChangedEmail } from "../utils/email_templates/email.recovery.password.js";
import { sendEmail } from "../config/nodemailer.js";

export const resetPasswordJournalistServices = async (token, password) => {

    const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

    const journalist = await Journalist.findOne({ where: { reset_token: hashedToken, reset_token_expire: { [Op.gt]: Date.now() }} });

    if (!journalist) {
        throw new Error("TOKEN_EXPIRED");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    journalist.password = hashedPassword;
    journalist.reset_token = null;
    journalist.reset_token_expire = null;

    await journalist.save();

    await sendEmail({
    
        to: journalist.email,
        subject: "Alerta de seguridad",
        html: await passwordChangedEmail(journalist.name, "https://tu-pagina.com/login")

    })

    return "Contraseña Actualizada"

}