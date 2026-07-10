import { Router } from "express";
import {getDashboardStats, getRecentActivities} from "../controllers/dashboard.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/dashboard').get(protect,authorize("admin"), getDashboardStats);
router.route('/dashboard/recent-activities').get(protect, authorize("admin"), getRecentActivities);

export default router
