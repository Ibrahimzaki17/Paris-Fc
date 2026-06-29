import mongoose from "mongoose";

const connectDB = async (req, res) => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`\n Database Connected !!! : ${connectionInstance.connection.host}`);       
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1)
    }
}

export default connectDB