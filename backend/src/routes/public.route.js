import { Router } from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";
import { getPublicAnnouncements, getPublicCoaches, getPublicMatches, getPublicPlayers } from "../controllers/public.controller.js";
import { createMessage, deleteAllMessages, deleteMessage, getMessage, markMessageAsRead } from "../controllers/message.controller.js";

const router = Router();

router.route('/players').get(getPublicPlayers);
router.route('/coaches').get(getPublicCoaches);
router.route('/matches').get(getPublicMatches);
router.route('/announcements').get(getPublicAnnouncements);

router.route('/messages').post(createMessage);
router.route('/messages').get(
    // protect,
    // authorize("admin"),
    getMessage);

router.route('/messages/:id').delete(
    // protect,
    // authorize("admin"),
    deleteMessage
)   

router.route('/messages').delete(
    // protect,
    // authorize("admin"),
    deleteAllMessages
)

router.route('/messages/:id/read').patch(
    // protect,
    // authorize("admin"),
    markMessageAsRead
)

export default router