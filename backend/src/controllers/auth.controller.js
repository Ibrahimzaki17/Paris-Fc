import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
}

//get user = login page
const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;

        //validation
        if(!email || !password) {
            return res.status(400).json({
                message: "email and password are required"
            })
        }
        
        //check if user already exists
        const user = await User.findOne({
            email: email.toLowerCase()
        }).select("+password");

        if(!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        //if user exists compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                message: "incorrect password"
            })
        }

        //update login status
        user.loggedIn = true;
        await user.save();

        const token = generateToken(user._id);

        res.status(200).json({
            message: `Welcome ${user.fullname}`,
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//change password
const changePassword = async (req, res) => {
    try {
        const {currentPassword, newPassword, confirmPassword} = req.body;

        //basic validation
        if(!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "All fields must be filled"
            })
        }

        //get logged in user
        const user = await User.findById(req.user._id).select("+password");

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        //check current password
        const isMatch = await bcrypt.compare(
             currentPassword,
             user.password
        );

        if(!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            })
        }

        //check if new password match
        if(newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "New password do not match"
            })
        }

        //check password length
        if(newPassword.length < 6 || newPassword.length > 12) {
            return res.status(400).json({
                 message: "Password must be between 6 and 12 characters"
            })
        }

        //prevent using the same password
        if(currentPassword === newPassword) {
            return res.status(400).json({
                message: "New password cannot be the same as the current password"
            })
        }

        //hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //save new password
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message: "Password changed succesfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    };
}

export {
    loginUser, changePassword
}