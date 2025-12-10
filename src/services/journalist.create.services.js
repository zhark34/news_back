import Journalist from '../models/journalist.js';
import { generatePassword } from '../utils/generate.password.js';
import { hashPassword } from '../utils/hash.password.js';
import { sendEmail } from '../config/nodemailer.js';
import {journalistWelcomeEmail} from '../utils/email templates/journalist.welcome.js'
import { generateId } from '../utils/id.generator.js';

export const createJournalistServices = async (name, email, role) =>{

    const existEmail = await Journalist.findOne({
        where: { email }
    });

    if (existEmail) {
        throw new Error("EMAIL_EXIST");
    }

    const password = await generatePassword();

    const hashPasw = await hashPassword(password);

    const journalistId = await generateId();

    const journalist = await Journalist.create({
        name,
        email,
        journalist_id: journalistId,
        bio: "Ingrese una biografia",
        role,
        password: hashPasw
    });

    await sendEmail({

        to: email,
        subject: "Bienvenido a DIARIO",
        html: await journalistWelcomeEmail(name, email, password, "https://tu-pagina.com/login")

    })

    return "Periodista creado, revise su email"

}