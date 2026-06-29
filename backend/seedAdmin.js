import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "./src/models/user.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashedPassword = await bcrypt.hash("admin123", 10);

await User.create({
    fullname: "System Admin",
    email: "admin@parisfc.com",
    password: hashedPassword,
    role: "admin",
    loggedIn: false
});

console.log("Admin created");

process.exit();

