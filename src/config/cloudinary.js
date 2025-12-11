import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export const uploadImage = async (filePath, folder = "news-images") => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder
        });

        return result.secure_url;

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("IMAGE_UPLOAD_FAILED");
    }
};

export default cloudinary;