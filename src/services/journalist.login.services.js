import Journalist from "../models/journalist.js"
import { validatePassword } from '../utils/validate.password.js'
import { generateToken } from "../utils/generate.token.js"

export const loginJournalistServices = async (email, password) =>{


    const validateJournalist = await Journalist.findOne({where: { email }})

    if(!validateJournalist){

        throw new Error("JOURNALITS_NO_EXIST");

    }

    const passwordValidation = await validatePassword(password, validateJournalist.password);

    if(!passwordValidation){

        throw new Error("WRONG_PASSWORD");

    }

    const payload = {
        id: validateJournalist.id,
        email: validateJournalist.email,
        role: validateJournalist.role
    };

    const token = await generateToken(payload);

    return{

        message: "Login exitoso",
        token: token,
        id: validateJournalist.journalist_id,
        name: validateJournalist.name,
        role: validateJournalist.role

    }

}