import mongoose from "mongoose";

const coachSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true
        },
        position: {
            type: String,
            required: true,
            enum: [
                "head-coach", "assistant-coach"
            ]
        },
        age: {
            type: Number,
            required: true
        },
        phone: {
            type: String
        },
        image: {
            type: String
        },
        nationality: {
            type: String,
            default: "Kenya"
        },
        status: {
            type: String,
            enum: ["Active","Suspended"],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

const Coach = mongoose.model("Coach", coachSchema);

export default Coach
