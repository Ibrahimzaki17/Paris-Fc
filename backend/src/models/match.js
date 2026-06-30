import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: String,
      required: true,
    },

    awayTeam: {
      type: String,
      required: true,
    },

    matchDate: {
      type: Date,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    competition: {
      type: String,
      required: true,
      enum: ["league", "friendly", "cup"],
      default: "Friendly"
    },

    status: {
      type: String,
      enum: ["upcoming", "completed", "postponed"],
      default: "Upcoming",
    },

    homeScore: {
      type: Number,
      default: 0,
    },

    awayScore: {
      type: Number,
      default: 0,
    },

    homeImage: {
      type: String,
    },
    awayImage: {
      type: String,
    },
    result: {
      type: String,
      enum: ["win", "draw", "loss", "pending"],
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Match = mongoose.model("Match", matchSchema);

export default Match;
