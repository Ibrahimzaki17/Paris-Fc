/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Player management endpoints
 */

import { Router } from "express";
import { createPlayer, deletePlayer,getAllPlayers,getPlayer,editPlayer, searchPlayers } from "../controllers/player.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import validateRequiredFields from "../middleware/validation.middleware.js";

const router = Router();

//create player
/**
 * @swagger
 * /players:
 *   post:
 *     summary: Create a new player
 *     description: Creates a player account and player profile.
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - position
 *               - age
 *               - phone
 *               - jerseyNumber
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               position:
 *                 type: string
 *               age:
 *                 type: integer
 *               phone:
 *                 type: string
 *               jerseyNumber:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Player created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
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
       createPlayer);

//get players
/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get all players
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Players retrieved successfully
 */
router.route('/players').get(protect, getAllPlayers);

//search player
/**
 * @swagger
 * /players/search:
 *   get:
 *     summary: Search players
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.route('/players/search').get(protect, authorize("admin"), searchPlayers)

//get player
/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Get player by ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player retrieved successfully
 *       404:
 *         description: Player not found
 */
router.route('/players/:id').get(protect, getPlayer);

//edit player
/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Update player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               position:
 *                 type: string
 *               age:
 *                 type: integer
 *               phone:
 *                 type: string
 *               jerseyNumber:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Player updated successfully
 */
router.route('/players/:id').put(protect, authorize("admin"),upload.single("image"), editPlayer);

//delete players
/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Delete player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player deleted successfully
 *       404:
 *         description: Player not found
 */
router.route('/players/:id').delete(protect, authorize("admin"), deletePlayer);

//get player
router.route('/me').get(protect, (req, res) => {
    res.json(req.user);
});


export default router