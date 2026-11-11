import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: String,
      required: true,
      trim: true,
    },

    awayTeam: {
      type: String,
      required: true,
      trim: true,
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
      enum: ["League", "Friendly", "Cup"],
      default: "Friendly",
    },

    status: {
      type: String,
      enum: ["upcoming", "completed", "postponed"],
      default: "upcoming",
    },

    homeScore: {
      type: Number,
      default: 0,
      min: 0,
    },

    awayScore: {
      type: Number,
      default: 0,
      min: 0,
    },

    homeImage: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    awayImage: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    result: {
      type: String,
      enum: ["home", "away", "draw", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Match = mongoose.model("Match", matchSchema);

export default Match;
