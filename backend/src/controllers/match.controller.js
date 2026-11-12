import Match from "../models/match.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { hasTeamConflict } from "../utils/match.utils.js";


// Get the beginning and end of a match's calendar day
const getDayRange = (date) => {
  const startDay = new Date(date);
  startDay.setHours(0, 0, 0, 0);

  const endDay = new Date(date);
  endDay.setHours(23, 59, 59, 999);

  return { startDay, endDay };
};

// Determine the result from the scores
const calculateResult = (homeScore, awayScore) => {
  if (homeScore > awayScore) return "home";
  if (awayScore > homeScore) return "away";
  return "draw";
};


const createMatch = async (req, res) => {
  try {
    const {
      homeTeam,
      awayTeam,
      venue,
      competition,
    } = req.body;

    // Use the date already validated by validateMatch middleware
    const parsedDate = req.matchDate;

    // Get uploaded image files
    const homeFile = req.files?.homeImage?.[0];
    const awayFile = req.files?.awayImage?.[0];

    // Store Cloudinary URL and public ID
    const homeImage = homeFile
      ? {
          url: homeFile.path,
          publicId: homeFile.filename,
        }
      : { url: "", publicId: "" };

    const awayImage = awayFile
      ? {
          url: awayFile.path,
          publicId: awayFile.filename,
        }
      : { url: "", publicId: "" };

    // Create match
    const match = await Match.create({
      homeTeam,
      awayTeam,
      matchDate: parsedDate,
      venue: venue.trim(),
      competition,
      status: "upcoming",
      homeScore: 0,
      awayScore: 0,
      homeImage,
      awayImage,
      result: "pending",
    });

    return res.status(201).json({
      message: "Match created successfully.",
      match: {
        id: match._id,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        matchDate: match.matchDate,
        venue: match.venue,
        competition: match.competition,
        status: match.status,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        homeImage: match.homeImage,
        awayImage: match.awayImage,
        result: match.result,
      },
    });

  } catch (error) {

    // Collect uploaded Cloudinary image public IDs
    const uploadedImages = [
      req.files?.homeImage?.[0]?.filename,
      req.files?.awayImage?.[0]?.filename,
    ].filter(Boolean);

    // Remove uploaded images if match creation fails
    for (const publicId of uploadedImages) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cleanupError) {
        console.error(
          `Failed to clean up Cloudinary image ${publicId}:`,
          cleanupError.message
        );
      }
    }

    console.error("Create match error:", error);

    return res.status(500).json({
      message: "Failed to create match.",
      error: error.message,
    });
  }
};



//get all matches
const getAllMatches = async (req, res) => {
  try {

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const homeTeam = req.query.homeTeam || "";
    const awayTeam = req.query.awayTeam || "";
    const competition = req.query.competition || "";

    const query = {
      status: "upcoming"
    };

    if (search) {
      query.$or = [
        {
          homeTeam: {
            $regex: search,
            $options: "i"
          }
        },
        {
          awayTeam: {
            $regex: search,
            $options: "i"
          }
        },
        {
          competition: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    if (homeTeam) {
      query.homeTeam = {
        $regex: `^${homeTeam}$`,
        $options: "i"
      }
    }

    if (awayTeam) {
      query.awayTeam = {
        $regex: `^${awayTeam}$`,
        $options: "i"
      }
    }

    if (competition) {
      query.competition = {
        $regex: `^${competition}$`,
        $options: "i"
      }
    }

    const totalMatches = await Match.countDocuments(query);

    const totalPages = Math.ceil(totalMatches / limit);

    //find all matches and populate
    const matches = await Match.find(query)
      .sort({ matchDate: 1 })
      .skip(skip)
      .limit(limit)

    //formatted
    const formattedMatches = matches.map((match) => ({
      id: match._id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      matchDate: match.matchDate,
      venue: match.venue,
      competition: match.competition,
      status: match.status,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      homeImage: match.homeImage?.url || null,
      awayImage: match.awayImage?.url || null,
      result: match.result,
    }));

    res.status(200).json({
      currentPage: page,
      totalPages,
      totalMatches,
      matchesPerPage: limit,
      message: "All Matches",
      matches: formattedMatches
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//delete match
const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    //validate MongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Match ID."
      })
    }

    //find match
    const match = await Match.findById(id);

    if (!match) {
      return res.status(404).json({
        message: "Match not found",
      });
    }

    // Delete the match from the database
    await match.deleteOne();

    // Delete its images from Cloudinary
    const imagePublicIds = [
      match.homeImage?.publicId,
      match.awayImage?.publicId,
    ].filter(Boolean);

    for (const publicId of imagePublicIds) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error(`Failed to delete Cloudinary image ${publicId}:`, error);
      }
    }

    //delete match from Database
    await match.deleteOne();

    res.status(200).json({
      message: "Match deleted Succesfully",
      deletedMatch: {
        id: match._id,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        status: match.status
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//edit match
const editMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      homeTeam,
      awayTeam,
      matchDate,
      competition,
      venue,
    } = req.body;

    // Find the match
    const match = await Match.findById(id);

    if (!match) {
      return res.status(404).json({
        message: "Match not found.",
      });
    }

    // Use existing values when fields are not supplied
    const updatedHomeTeam = (homeTeam ?? match.homeTeam).trim();
    const updatedAwayTeam = (awayTeam ?? match.awayTeam).trim();
    const updatedVenue = (venue ?? match.venue).trim();
    const updatedCompetition = competition ?? match.competition;
    const updatedDate = new Date(matchDate ?? match.matchDate);

    // Validate required values
    if (!updatedHomeTeam || !updatedAwayTeam || !updatedVenue) {
      return res.status(400).json({
        message: "Please provide all required match details.",
      });
    }

    // Teams cannot be the same
    if (
      updatedHomeTeam.toLowerCase() ===
      updatedAwayTeam.toLowerCase()
    ) {
      return res.status(400).json({
        message: "A team cannot play against itself.",
      });
    }

    // Validate date
    if (Number.isNaN(updatedDate.getTime())) {
      return res.status(400).json({
        message: "Please provide a valid match date.",
      });
    }

    // Validate upcoming match date
    const updatedStatus = req.body.status ?? match.status;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (updatedStatus === "upcoming" && updatedDate < today) {
      return res.status(400).json({
        message: "An upcoming match cannot have a date in the past.",
      });
    }

    // Check whether either team already has a match that day
    const existingMatch = await hasTeamConflict(
      updatedHomeTeam,
      updatedAwayTeam,
      updatedDate,
      id
    );

    if (existingMatch) {
      return res.status(400).json({
        message: "One of these teams already has a match scheduled on this date.",
      });
    }

    // Update match details
    match.homeTeam = updatedHomeTeam;
    match.awayTeam = updatedAwayTeam;
    match.venue = updatedVenue;
    match.competition = updatedCompetition;
    match.matchDate = updatedDate;
    match.status = updatedStatus;

    // Handle scores and result
    if (updatedStatus === "completed") {
      const homeScore = Number(req.body.homeScore);
      const awayScore = Number(req.body.awayScore);

      if (
        req.body.homeScore === undefined ||
        req.body.awayScore === undefined ||
        !Number.isInteger(homeScore) ||
        !Number.isInteger(awayScore) ||
        homeScore < 0 ||
        awayScore < 0
      ) {
        return res.status(400).json({
          message: "Please provide valid scores for both teams.",
        });
      }

      match.homeScore = homeScore;
      match.awayScore = awayScore;

      match.result = calculateResult(homeScore, awayScore);
    } else if (updatedStatus === "upcoming") {
      match.homeScore = 0;
      match.awayScore = 0;
      match.result = "pending";
    }

    // Home image
    // Keep track of old Cloudinary images
    const oldImagePublicIds = [];

    // Replace home team image
    if (req.files?.homeImage) {
      if (match.homeImage?.publicId) {
        oldImagePublicIds.push(match.homeImage.publicId);
      }

      const homeFile = req.files.homeImage[0];

      match.homeImage = {
        url: homeFile.path,
        publicId: homeFile.filename,
      };
    }

    // Replace away team image
    if (req.files?.awayImage) {
      if (match.awayImage?.publicId) {
        oldImagePublicIds.push(match.awayImage.publicId);
      }

      const awayFile = req.files.awayImage[0];

      match.awayImage = {
        url: awayFile.path,
        publicId: awayFile.filename,
      };
    }

    await match.save();

    // Delete old images from Cloudinary after saving the match
    for (const publicId of oldImagePublicIds) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error(`Failed to delete old Cloudinary image ${publicId}:`, error);
      }
    }

    return res.status(200).json({
      message: "Match updated successfully.",
      match,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getMatchesByStatus = (status) => async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const query = { status };

    const totalMatches = await Match.countDocuments(query);
    const totalPages = Math.ceil(totalMatches / limit);

    const matches = await Match.find(query)
      .sort({ matchDate: status === "completed" ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    const formattedMatches = matches.map((match) => ({
      id: match._id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      matchDate: match.matchDate,
      venue: match.venue,
      competition: match.competition,
      status: match.status,
      homeScore: match.homeScore,
      awayScore: match.awayScore,
      homeImage: match.homeImage?.url || null,
      awayImage: match.awayImage?.url || null,
      result: match.result,
    }));

    return res.status(200).json({
      currentPage: page,
      totalPages,
      totalMatches,
      matchesPerPage: limit,
      message: `${status} matches retrieved successfully.`,
      matches: formattedMatches,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getCompletedMatches = getMatchesByStatus("completed");
const getPostponedMatches = getMatchesByStatus("postponed");



export { createMatch, getAllMatches, deleteMatch, editMatch, getCompletedMatches, getPostponedMatches };


