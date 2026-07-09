import { Router } from "express";
import { changePassword, loginUser } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

//login
router.route('/login').post(loginUser);
//change passsword
router.route('/change-password').put(protect, changePassword);

export default router