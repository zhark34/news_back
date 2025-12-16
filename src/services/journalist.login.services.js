import Journalist from "../models/journalist.js"
import Session from "../models/sessions.js"
import { validatePassword } from '../utils/validate.password.js'
import { generateToken } from "../utils/generate.token.js"
import { generateId } from "../utils/id.generator.js"
import { generateRefreshToken } from '../utils/generate.refresh.token.js'
import { sendEmail } from "../config/nodemailer.js"
import { loginAlertEmail } from "../utils/email_templates/email.alert.session.js"

export const loginJournalistServices = async (email, password, device, ip, country, province, city) =>{

    const validateJournalist = await Journalist.findOne({where: { email }})

    if(!validateJournalist){

        throw new Error("JOURNALITS_NO_EXIST");

    }

    const passwordValidation = await validatePassword(password, validateJournalist.password);

    if(!passwordValidation){

        throw new Error("WRONG_PASSWORD");

    }

    const id_token = generateId();

    const {refreshToken, hashed} = await generateRefreshToken();

    const newSession = await Session.create({

        journalist_id: validateJournalist.journalist_id,
        id_token: id_token,
        refresh_token_hash: hashed,
        user_agent: device.browser,
        ip: ip,
        location_country: country,
        location_region: province,
        location_city: city,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    })

    const payload = {
        journalist_id: validateJournalist.journalist_id,
        email: validateJournalist.email,
        role: validateJournalist.role,
        id_token: id_token
    };

    await sendEmail({

        to: validateJournalist.email, 
        subject: "Alerta de inicio de sesión",
        html: loginAlertEmail(validateJournalist.name, "linkreferencia.com", ip, country, province, city)

    })

    const token = await generateToken(payload);

    return{

        message: "Login exitoso",
        token: token,
        refresh_token: refreshToken,
        id: validateJournalist.journalist_id,
        name: validateJournalist.name,
        role: validateJournalist.role,
        photo: validateJournalist.profile_image_url

    }

}