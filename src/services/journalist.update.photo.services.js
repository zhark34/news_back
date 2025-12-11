import Journalist from "../models/journalist.js"
import { validatePassword } from "../utils/validate.password.js";
import { uploadImage } from "../config/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs-extra';

export const updatePhotoJournalistServices = async (email, password, photoPath) =>{

    const checkJournalist = await Journalist.findOne({where: { email }})

    if(!checkJournalist){

        throw new Error("JOURNALITS_NO_EXIST");

    }

    const passwordValidation = await validatePassword(password, checkJournalist.password);

    if(!passwordValidation){

        throw new Error("WRONG_PASSWORD");

    }

    if (checkJournalist.profile_image_public_id) {
        try {
            await cloudinary.uploader.destroy(checkJournalist.profile_image_public_id);
        } catch (error) {
            console.log("Error eliminando imagen antigua de Cloudinary (no crítico):", error);
        }
    }

    const {url, public_id} = await uploadImage(photoPath, "news-image/journalist/photo_profile");

    checkJournalist.profile_image_url = url;
    checkJournalist.profile_image_public_id = public_id;

    await checkJournalist.save();

    return checkJournalist.profile_image_url

}