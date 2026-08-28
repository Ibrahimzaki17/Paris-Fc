import Player from "../models/player.js";
import Coach from "../models/coach.js";
import Match from "../models/match.js";
import Announcement from "../models/announcements.js";

const getPublicPlayers = async (req, res) => {
    try {

        //pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        //search and filter
        const search = req.query.search || "";
        const position = req.query.position 
                       ? req.query.position.toUpperCase()
                       : "";

        //build query
        const query = {};

        //search by position
        if(search) {
            query.position = {
                $regex: search,
                $options: "i"
            }
        }

        //exact filter
        if(position) {
            query.position = position;
        }

        //count total players
        const totalPlayers = await Player.countDocuments(query);

        //calculate total pages
        const totalPages = Math.ceil(totalPlayers / limit);
        
        //get all players
        const players = await Player.find(query)
          .populate("user", "fullname email")
          .sort({ jerseyNumber: 1 })
          .skip(skip)
          .limit(limit);

         
        const formattedPlayers = players.map(player => ({
            id: player._id,
            fullname: player.user.fullname,
            position: player.position,
            jerseyNumber: player.jerseyNumber,
            email: player.user.email,
            image: player.image 
                  ? `${req.protocol}://${req.get("host")}/uploads/${player.image}`
                  : null 
        }));
        
        res.status(200).json({
            currentPage: page,
            totalPages,
            totalPlayers,
            playersPerPage: limit,
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

        //pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const position = req.query.position || "";

        const query = {};

        if(search) {
            query.position = {
                $regex: search,
                $options: "i"
            }
        }

        if(position) {
            query.position = {
                $regex: `^${position}$`,
                $options: "i"
            }
        }


        const totalCoaches = await Coach.countDocuments(query);

        const totalPages = Math.ceil(totalCoaches / limit);
        
        //get all coaches
        const coaches = await Coach.find(query)
          .populate("user", "fullname email")
          .sort({ positionOrder: 1 })
          .skip(skip)
          .limit(limit)

        //format players
        const formattedCoaches = coaches.map(coach => ({
            id: coach._id,
            fullname: coach.user.fullname,
            position: coach.position,
            email: coach.user.email,
            image: coach.image
                 ? `${req.protocol}://${req.get("host")}/uploads/${coach.image}`
                 : null 
        }));
        
        res.status(200).json({
            currentPage: page,
            totalPages,
            totalCoaches,
            coachesPerPage: limit,
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
        
        //get matches
        const matches = await Match.find(query)
          .sort({ matchDate: 1 })
          .skip(skip)
          .limit(limit)
          

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
                  ? `${req.protocol}://${req.get("host")}/uploads/${match.homeImage}`
                  : null ,
            awayImage: match.awayImage
                  ? `${req.protocol}://${req.get("host")}/uploads/${match.awayImage}`
                  : null ,
        }));

        res.status(200).json({
            currentPage: page,
            totalPages,
            totalMatches,
            matchesPerPage: limit,
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

        //pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const title = req.query.title || "";

        const query = {};

        if(search) {
            query.title = {
                $regex: search,
                $options: "i"
            }
        }

        if(title) {
            query.title = {
                $regex: `^${title}$`,
                $options: "i"
            }
        }

        const totalAnnouncements = await Announcement.countDocuments(query);

        const totalPages = Math.ceil(totalAnnouncements / limit);

        const announcements = await Announcement.find(query)
           .populate("author", "fullname role")
           .sort({ createdAt: -1 })
           .skip(skip)
           .limit(limit)

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
            currentPage: page,
            totalPages,
            totalAnnouncements,
            announcementsPerPage: limit,
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