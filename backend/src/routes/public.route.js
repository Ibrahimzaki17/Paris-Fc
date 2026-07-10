import { Router } from "express";
import { getPublicAnnouncements, getPublicCoaches, getPublicMatches, getPublicPlayers } from "../controllers/public.controller.js";

const router = Router();

router.route('/players').get(getPublicPlayers);
router.route('/coaches').get(getPublicCoaches);
router.route('/matches').get(getPublicMatches);
router.route('/announcements').get(getPublicAnnouncements);

export default router