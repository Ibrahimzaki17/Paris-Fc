import { Router } from "express";
import { createCoach, deleteCoach,getAllCoaches,getCoach,editCoach, searchCoaches } from "../controllers/coach.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import validateRequiredFields from "../middleware/validation.middleware.js";

const router = Router();

//create Coach
router.route('/coaches').post(
      protect,
       authorize("admin"),
       upload.single("image"),
       validateRequiredFields([
        "fullname",
        "email",
        "position",
        "age",
        "phone"
       ]),
        createCoach);
//get Coachs
router.route('/coaches').get(protect, getAllCoaches);
//search Coach
router.route('/coaches/search').get(protect, authorize("admin"), searchCoaches)
//get Coach
router.route('/coaches/:id').get(protect, getCoach);
//edit Coach
router.route('/coaches/:id').put(protect, authorize("admin"),upload.single("image"), editCoach);
//delete Coachs
router.route('/coaches/:id').delete(protect, authorize("admin"), deleteCoach);
//get Coach
router.route('/me').get(protect, (req, res) => {
    res.json(req.user);
});


export default router