import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

// Upload one image buffer to Cloudinary
const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "paris-fc",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        Readable.from(file.buffer).pipe(stream);
    });
};

// Middleware to upload parsed images to Cloudinary
const uploadToCloudinary = async (req, res, next) => {
    const uploadedImages = [];

    try {
        let files = [];

        // Single image: upload.single()
        if (req.file) {
            files.push(req.file);
        }

        // Multiple images: upload.array() or upload.fields()
        if (Array.isArray(req.files)) {
            files.push(...req.files);
        } else if (req.files && typeof req.files === "object") {
            Object.values(req.files).forEach((fileArray) => {
                files.push(...fileArray);
            });
        }

        // No images to upload
        if (files.length === 0) {
            return next();
        }

        // Upload images one by one
        for (const file of files) {
            const result = await uploadImage(file);

            // Preserve properties expected by existing controllers
            file.path = result.secure_url;
            file.filename = result.public_id;

            uploadedImages.push(result.public_id);
        }

        next();

    } catch (error) {

        // Remove any images already uploaded if another upload fails
        for (const publicId of uploadedImages) {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (cleanupError) {
                console.error(
                    "Cloudinary cleanup failed:",
                    cleanupError.message
                );
            }
        }

        console.error("Cloudinary upload failed:", error);

        return res.status(500).json({
            success: false,
            message: "Image upload failed",
        });
    }
};

export default uploadToCloudinary;
