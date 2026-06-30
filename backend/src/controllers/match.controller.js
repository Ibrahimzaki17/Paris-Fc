import Match from "../models/match.js";
import mongoose from "mongoose";

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
      homeImage,
      awayImage,
      result,
    } = req.body;


    //basic validation
    if (!homeTeam || !awayTeam || !matchDate || !venue || !competition || !homeImage || !awayImage) {
      return res.status(400).json({
        message: "All fields must be filled",
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
    startDay.setHours(0,0,0,0);

    const endDay = new Date(matchDay);
    endDay.setHours(23,59,59,999);

    //check if match exists
    const existingMatch = await Match.findOne({
      matchDate: {
        $gte: startDay,
        $lte: endDay
      },
      $or: [
        {homeTeam},
        {awayTeam},
        {homeTeam: awayTeam},
        {awayTeam: homeTeam}
      ]
    });
    if (existingMatch) {
      return res.status(400).json({
        message: "The Team already has a match scheduled on this date",
      });
    }

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
        //find all matches and populate
        const matches = await Match.find();

        //formatted
        const formattedMatches = matches.map(match => ({
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
        }))

        if(matches.length === 0) {
            res.status(200).json({
                message: "All Matches retrieved succesfully",
                matches
            })
        }

        res.status(200).json({
            message: "All Matches",
            count: formattedMatches.length,
            formattedMatches
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//delete match
const deleteMatch = async (req, res) => {
    try {
        const {id} = req.params

        //find match
        const match = await Match.findById(id);

        if(!match) {
            return res.status(404).json({
                message: "Match not found"
            })
        }

        //delete
        await match.deleteOne();

        res.status(200).json({
            message: "Match deleted Succesfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//edit match
const editMatch = async (req, res) => {
    try {
        const {id} = req.params;

        const {
            homeTeam,
            awayTeam,
            matchDate,
            competition,
            venue,
            status,
            homeScore,
            awayScore,
            homeImage,
            awayImage,
            result
        } = req.body;


        //find the match
        const match = await Match.findById(id);

        if(!match) {
            return res.status(404).json({
                message: "Match not found"
            });
        };

       if (homeTeam === awayTeam) {
           return res.status(400).json({
                message: "A team cannot play against itself.",
            });
        }

        //calculate day range
        const matchDay = new Date(matchDate);

        const startDay = new Date(matchDay);
        startDay.setHours(0,0,0,0);

        const endDay = new Date(matchDay);
        endDay.setHours(23,59,59,999);

        //check if match exists
        const existingMatch = await Match.findOne({
            matchDate: {
            $gte: startDay,
            $lte: endDay
            },
            $or: [
            {homeTeam},
            {awayTeam},
            {homeTeam: awayTeam},
            {awayTeam: homeTeam}
            ]
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
        })

        if(duplicateMatch) {
            return res.status(400).json({
                message: "A match with these details already exists"
            });
        };

        match.homeTeam = req.body.homeTeam || match.homeTeam;
        match.awayTeam = req.body.awayTeam || match.awayTeam;
        match.venue = req.body.venue || match.venue;
        match.competition = req.body.competition || match.competition;
        match.matchDate = req.body.matchDate || match.matchDate;
        match.homeScore = req.body.homeScore || match.homeScore;
        match.awayScore = req.body.awayScore || match.awayScore;
        match.homeImage = req.body.homeImage || match.homeImage;
        match.awayImage = req.body.awayImage || match.awayImage;
        match.result = req.body.result || match.result;

        await match.save();

        res.status(200).json({
            message: "Match updated succesfully",
            match
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



export { createMatch, getAllMatches, deleteMatch, editMatch };
