
import multer from "multer";
import path from "path";

// Use memory storage instead of uploading directly to Cloudinary
const storage = multer.memoryStorage();

// Allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png|webp/;

    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = file.mimetype.startsWith("image/");

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export default upload;








// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";
// import path from "path";

// // Configure Cloudinary as Multer's storage destination
// const storage = new CloudinaryStorage({
//     cloudinary,

//     params: {
//         folder: "paris-fc",

//         allowed_formats: ["jpg", "jpeg", "png", "webp"],

//         public_id: (req, file) => {
//             return (
//                 Date.now() +
//                 "-" +
//                 Math.round(Math.random() * 1E9)
//             );
//         },
//     },
// });

// // Allow only image files
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpg|jpeg|png|webp/;

//     const extname = allowedTypes.test(
//         path.extname(file.originalname).toLowerCase()
//     );

//     const mimetype = file.mimetype.startsWith("image/");

//     if (extname && mimetype) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only image files are allowed"));
//     }
// };

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: {
//         fileSize: 5 * 1024 * 1024,
//     },
// });

// export default upload;

