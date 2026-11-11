import User from "../models/user.js";
import Player from "../models/player.js";

const checkExistingUser = async (req, res, next) => {
    try {
        const email = req.body.email.trim().toLowerCase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        next();

    } catch (error) {
        next(error);
    }
};

const checkingExistingJerseyNumber = async (req, res, next) => {
    try {
        const jerseyNumber = Number(req.body.jerseyNumber);

        const existingJerseyNumber = await Player.findOne({ jerseyNumber });

        if(existingJerseyNumber) {
            return res.status(400).json({
                success: false,
                message: "Jersey Number already taken"
            })
        }

        next();

    } catch (error) {
        next(error);
    }
}

export {
    checkExistingUser, checkingExistingJerseyNumber
} 
