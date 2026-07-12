import { Router } from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";
import { createMatch, getAllMatches, deleteMatch, editMatch } from "../controllers/match.controller.js";
import upload from "../middleware/upload.middleware.js";
import validateRequiredFields from "../middleware/validation.middleware.js";

const router = Router();

//create Match
router.route('/matches').post(
    protect,
    authorize("admin", "coach"),
    upload.fields([
        { name:"homeImage", maxCount:1 },
        { name:"awayImage", maxCount:1 }
    ]), 
    validateRequiredFields([
        "homeTeam",
        "awayTeam",
        "matchDate",
        "venue",
        "competition"
    ]),
    createMatch
);
//get all matches
router.route('/matches').get(protect, authorize("admin", "coach"), getAllMatches);
//delete match
router.route('/matches/:id').delete(protect, authorize("admin", "coach"), deleteMatch);
//edit match
router.route('/matches/:id').put(protect, authorize("admin", "coach"),upload.fields([
        { name:"homeImage", maxCount:1 },
        { name:"awayImage", maxCount:1 }
    ]), 
    editMatch
);

export default router


/**

Once your project grows, you could also validate things like:

✅ Home team and away team can't be the same.
✅ A team can't have two matches on the same day.
✅ Match date can't be in the past when creating an upcoming match.
✅ Scores can't be edited while the match status is "upcoming".
✅ A match marked "completed" must have a valid result.
✅ If homeScore > awayScore, then result should be "home" (and similarly for "away" or "draw").

Those kinds of business rules make the application much more reliable.
 */