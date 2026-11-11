import { Router } from "express";
import { createPlayer, deletePlayer,getAllPlayers,getPlayer,editPlayer, searchPlayers, getMyProfile } from "../controllers/player.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import validateRequiredFields from "../middleware/validation.middleware.js";
import uploadToCloudinary from "../middleware/cloudinaryUpload.middleware.js";
import {checkExistingUser, checkingExistingJerseyNumber} from "../middleware/checkExisting.middleware.js";

const router = Router();

//create player
router.route('/players').post(
      protect, 
      authorize("admin"),
      upload.single("image"),
      validateRequiredFields([
        "fullname",
        "email",
        "position",
        "age",
        "phone",
        "jerseyNumber"
      ]),
      checkExistingUser,
      checkingExistingJerseyNumber,
      uploadToCloudinary,
       createPlayer);

//get players
router.route('/players').get(protect, getAllPlayers);

//search player
router.route('/players/search').get(protect, authorize("admin"), searchPlayers)

router.route('/me').get(
    protect,
    authorize("player"),
    getMyProfile
);

//get player
router.route('/players/:id').get(protect, getPlayer);

//edit player
router.route('/players/:id').put(
      protect, 
      authorize("admin"),
      upload.single("image"), 
      uploadToCloudinary,
      editPlayer);

//delete players
router.route('/players/:id').delete(protect, authorize("admin"), deletePlayer);

//get player
// router.route('/me').get(protect, (req, res) => {
//     res.json(req.user);
// });



export default router