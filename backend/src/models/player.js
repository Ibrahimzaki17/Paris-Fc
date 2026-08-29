// models/Player.js

import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    position: {
      type: String,
      required: true,
      enum: [
        "GoalKeeper",
        "Right Back",
        "Center Back",
        "Left Back",
        "Defensive Midfield",
        "Center Midfield",
        "Attacking Midfield",
        "Right Wing",
        "Left Wing",
        "Striker"
      ]
    },

    jerseyNumber: {
      type: Number,
      required: true,
      unique: true
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

    isCaptain: {
      type: Boolean,
      default: false
    },

    isViceCaptain: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["Active", "Injured", "Suspended"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;