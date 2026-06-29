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
    },

    status: {
      type: String,
      enum: ["Upcoming", "Completed", "Postponed"],
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

    image: {
      type: String,
    },
    result: {
      type: String,
      enum: ["Win", "Draw", "Loss"],
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Match = mongoose.model("Match", matchSchema);

export default Match;
