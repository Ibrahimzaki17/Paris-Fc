import mongoose from "mongoose";

const connectDB = async (req, res) => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`\n Database Connected !!! : ${connectionInstance.connection.host}`);       
    } catch (error) {
        console.error("Database connection failed", error.message);
        throw error;
    }
}

export default connectDB