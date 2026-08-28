import Match from "../models/match.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

//create match
const createMatch = async (req, res) => {
  try {
    
    const {
      homeTeam,
      awayTeam,
      matchDate,
      venue,
      competition,
      homeScore,
      awayScore,
      result,
    } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(400).json({
        message: "A team cannot play against itself.",
      });
    }

    //calculate day range
    const matchDay = new Date(matchDate);

    const startDay = new Date(matchDay);
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date(matchDay);
    endDay.setHours(23, 59, 59, 999);

    //check if match exists
    const existingMatch = await Match.findOne({
      matchDate: {
        $gte: startDay,
        $lte: endDay,
      },
      $or: [
        { homeTeam },
        { awayTeam },
        { homeTeam: awayTeam },
        { awayTeam: homeTeam },
      ],
    });
    if (existingMatch) {
      return res.status(400).json({
        message: "The Team already has a match scheduled on this date",
      });
    }

    const homeImage = req.files?.homeImage
      ? req.files.homeImage[0].filename
      : "";

    const awayImage = req.files?.awayImage
      ? req.files.awayImage[0].filename
      : "";

    //create match
    const match = await Match.create({
      homeTeam,
      awayTeam,
      matchDate,
      venue,
      competition,
      status: "upcoming",
      homeScore: 0,
      awayScore: 0,
      homeImage,
      awayImage,
      result: "pending",
    });

    res.status(201).json({
      message: "Match Created Succesfully",
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
    res.status(500).json({
      message: error.message,
    });
  }
};

//get all matches
const getAllMatches = async (req, res) => {
  try {

  //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
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

    if(homeTeam) {
        query.homeTeam = {
            $regex: `^${homeTeam}$`,
            $options: "i"
        }
    }

    if(awayTeam) {
        query.awayTeam = {
            $regex: `^${awayTeam}$`,
            $options: "i"
        }
    }

    if(competition) {
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
      homeImage: match.homeImage
                  ? `${req.protocol}://${req.get("host")}/uploads/${match.homeImage}`
                  : null ,
      awayImage: match.awayImage
                  ? `${req.protocol}://${req.get("host")}/uploads/${match.awayImage}`
                  : null ,
      result: match.result,
    }));

    // if (matches.length === 0) {
    //   res.status(200).json({
    //     message: "All Matches retrieved succesfully",
    //     matches,
    //   });
    // }

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

    //find match
    const match = await Match.findById(id);

    if (!match) {
      return res.status(404).json({
        message: "Match not found",
      });
    }
    
        // Delete home image
    if (match.homeImage) {

        const homeImagePath = path.join("uploads", match.homeImage);

        if (fs.existsSync(homeImagePath)) {
            fs.unlinkSync(homeImagePath);
        }
    }

    // Delete away image
    if (match.awayImage) {

        const awayImagePath = path.join("uploads", match.awayImage);

        if (fs.existsSync(awayImagePath)) {
            fs.unlinkSync(awayImagePath);
        }
    }

    //delete
    await match.deleteOne();

    res.status(200).json({
      message: "Match deleted Succesfully",
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

    //find the match
    const match = await Match.findById(id);

    if (!match) {
      return res.status(404).json({
        message: "Match not found",
      });
    }

    if (homeTeam === awayTeam) {
      return res.status(400).json({
        message: "A team cannot play against itself.",
      });
    }

    //calculate day range
    const matchDay = new Date(matchDate);

    const startDay = new Date(matchDay);
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date(matchDay);
    endDay.setHours(23, 59, 59, 999);

    //check if match exists
    const existingMatch = await Match.findOne({
      matchDate: {
        $gte: startDay,
        $lte: endDay,
      },
      $or: [
        { homeTeam },
        { awayTeam },
        { homeTeam: awayTeam },
        { awayTeam: homeTeam },
      ],
    });
    if (existingMatch) {
      return res.status(400).json({
        message: "The Team already has a match scheduled on this date",
      });
    }

    //check for duplicate matches
    const duplicateMatch = await Match.findOne({
      _id: { $ne: id }, //ignore the current match

      homeTeam,
      awayTeam,
      matchDate,
      competition,
    });

    if (duplicateMatch) {
      return res.status(400).json({
        message: "A match with these details already exists",
      });
    }

    match.homeTeam = req.body.homeTeam || match.homeTeam;
    match.awayTeam = req.body.awayTeam || match.awayTeam;
    match.venue = req.body.venue || match.venue;
    match.competition = req.body.competition || match.competition;
    match.matchDate = req.body.matchDate || match.matchDate;
    match.homeScore = req.body.homeScore || match.homeScore;
    match.awayScore = req.body.awayScore || match.awayScore;
    //homeImage
    if (req.files?.homeImage) {
      const oldHomeImage = path.join("uploads", match.homeImage);
      if (fs.existsSync(oldHomeImage)) {
        fs.unlinkSync(oldHomeImage);
      }
      match.homeImage = req.files.homeImage[0].filename;
    }
    //awayImage
    if (req.files?.awayImage) {
      const oldAwayImage = path.join("uploads", match.awayImage);
      if (fs.existsSync(oldAwayImage)) {
        fs.unlinkSync(oldAwayImage);
      }
      match.awayImage = req.files.awayImage[0].filename;
    }

    match.result = req.body.result || match.result;

    await match.save();

    res.status(200).json({
      message: "Match updated succesfully",
      match,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export { createMatch, getAllMatches, deleteMatch, editMatch };
