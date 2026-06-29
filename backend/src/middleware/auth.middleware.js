import jwt from 'jsonwebtoken'
import Player from '../models/player.js';
import User from '../models/user.js';

//protect routes
const protect = async (req, res, next) => {
    let token;

    try {
        //check if token exists
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

            //extract token
            token = req.headers.authorization.split(" ")[1];

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //get user from DB and exclude the password
            const user = await User.findById(decoded.id).select("-password");
            if(!user){
                return res.status(401).json({
                    message: "User not found"
                });
            }

            //attach user to request
            req.user = user;
            //continue to next middleware/controller
            next();

        }else {
            return res.status(401).json({
                message: "Not authorized, no token"
            });
        }

    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
}

//role middleware // authorize
const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied",
            });
        }

        next();
    };
};
/*
//admin
const isAdmin = (req, res, next) => {
    try {
        if(!req.user) {
            return res.status(401).json({
                message: "Npt authenticated"
            });
        }
        if(req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied: Admin only"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
*/




export {protect, authorize}