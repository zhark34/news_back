import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export const uploadImage = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder,
            transformation: [
                { quality: "auto" },
                { fetch_format: "auto" }
            ]
        });

        return {
            url: result.secure_url,
            public_id: result.public_id
        };

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("IMAGE_UPLOAD_FAILED");
    }
};

export const uploadVideo = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder,
            resource_type: "video",
            transformation: [
                { quality: "auto" },
                { fetch_format: "auto" }
            ]
        });

        return {
            url: result.secure_url,
            public_id: result.public_id
        };

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("VIDEO_UPLOAD_FAILED");
    }
};

export const deleteImage = async (public_id) => {
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw new Error("IMAGE_DELETE_FAILED");
    }
};

export const deleteVideo = async (public_id) => {
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw new Error("VIDEO_DELETE_FAILED");
    }
};

export default cloudinary;