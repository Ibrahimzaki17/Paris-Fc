import { Router } from "express";
import { createAnnoucement, editAnnouncement, deleteAnnoucement, getAllAnnouncements } from "../controllers/announcement.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import validateRequiredFields from "../middleware/validation.middleware.js";

const router = Router();

//create announcement
router.route('/announcements').post(
    protect,
    authorize("admin", "coach"),
    upload.single("image"),
    validateRequiredFields([
        "title",
        "message"
    ]),
    createAnnoucement);
//edit announcements
router.route('/announcements/:id').put(protect, authorize("admin", "coach"),upload.single("image"), editAnnouncement);
//delete announcements
router.route('/announcements/:id').delete(protect, authorize("admin", "coach"), deleteAnnoucement);
//get all announcements
router.route('/announcements').get(protect, authorize("admin", "coach"), getAllAnnouncements);

export default router