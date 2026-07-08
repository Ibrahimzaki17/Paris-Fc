import { Router } from "express";
import { createPlayer,loginUser, deletePlayer,getAllPlayers,getPlayer,editPlayer, searchPlayers } from "../controllers/player.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

//create player
router.route('/players').post(protect, authorize("admin"),upload.single("image"), createPlayer);
//login
router.route('/login').post(loginUser);
//get players
router.route('/players').get(protect, getAllPlayers);
//search player
router.route('/players/search').get(protect, authorize("admin"), searchPlayers)
//get player
router.route('/players/:id').get(protect, getPlayer);
//edit player
router.route('/players/:id').put(protect, authorize("admin"),upload.single("image"), editPlayer);
//delete players
router.route('/players/:id').delete(protect, authorize("admin"), deletePlayer);
//get player
router.route('/me').get(protect, (req, res) => {
    res.json(req.user);
});


export default router