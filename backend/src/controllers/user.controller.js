import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
}

const createUser = async (req, res) => {
    try {
        const {fullname, email, password, role} = req.body

        //basic validation
        if(!fullname || !email || !password) {
            return res.status(400).json({
                message: "All fields must be filled"
            });
        }

        //check if user exists
        const existing = await User.findOne({
            email: email.toLowerCase()
        })
        if(existing) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        
        //hash password
        if(password.length < 6 || password.length > 12) {
            return res.status(400).json({
                message: "Password must be between 6 and 12 characters"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        //create user
        const user = await User.create({
            fullname,
            email: email.toLowerCase(),
            password: hashedPassword,
            role,
            loggedIn: false
        });

        res.status(201).json({
            message: "User registered",
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            }
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export {
    createUser
}