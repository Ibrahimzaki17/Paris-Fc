import Player from "../models/player.js";
import Coach from "../models/coach.js";
import Match from "../models/match.js";
import Announcement from "../models/announcements.js";

const getPublicPlayers = async (req, res) => {
    try {
        
        //get all players
        const players = await Player.find()
          .populate("user", "fullname")
          .sort({ jerseyNumber: 1 })
         
        const formattedPlayers = players.map(player => ({
            id: player._id,
            fullname: player.user.fullname,
            position: player.position,
            jerseyNumber: player.jerseyNumber,
            image: player.image 
                  ? `${req.protocol}://${req.get("host")}/uploads/${player.image}`
                  : null 
        }));
        
        res.status(200).json({
            players: formattedPlayers
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//get coaches
const getPublicCoaches = async (req, res) => {
    try {
        
        //get all coaches
        const coaches = await Coach.find()
          .populate("user", "fullname")
          .sort({ positionOrder: 1 });

        //format players
        const formattedCoaches = coaches.map(coach => ({
            id: coach._id,
            fullname: coach.user.fullname,
            position: coach.position,
            image: coach.image
                 ? `${req.protocol}://${req.get("host")}/uploads/${coach.image}`
                 : null 
        }));
        
        res.status(200).json({
            coaches: formattedCoaches
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//get matches
const getPublicMatches = async (req, res) => {
    try {
        
        //get matches
        const matches = await Match.find({
            status: "upcoming"
        })
          .sort({ matchDate: 1 })

        //format matches
        const formattedMatches = matches.map(match => ({
            id: match._id,
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            matchDate: match.matchDate,
            venue: match.venue,
            competition: match.competition,
            status: match.status,
            homeImage: match.homeImage
                  ? `${req.protocol}://${req.get("host")}/uploads/${homeImage.image}`
                  : null ,
            awayImage: match.awayImage
                  ? `${req.protocol}://${req.get("host")}/uploads/${awayImage.image}`
                  : null ,
        }));

        res.status(200).json({
            matches: formattedMatches
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//get announcements
const getPublicAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find()
           .populate("author", "fullname role")
           .sort({ createdAt: -1 })

        const formattedAnnouncements = announcements.map(announcement => ({
            id: announcement._id,
            title: announcement.title,
            message: announcement.message,
            image: announcement.image
                 ? `${req.protocol}://${req.get("host")}/uploads/${announcement.image}`
                 : null ,
            author: announcement.author.fullname,
            role: announcement.author.role,
            createdAt: announcement.createdAt
        }));

        if(announcements.length === 0) {
            return res.status(200).json({
                message: "All annoucements retrieved succesfully",
                announcements: []
            })
        }

        res.status(200).json({
            announcements: formattedAnnouncements
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export {
    getPublicPlayers, getPublicCoaches, getPublicMatches, getPublicAnnouncements
}