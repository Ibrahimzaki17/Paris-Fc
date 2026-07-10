import Player from "../models/player.js";
import Coach from "../models/coach.js";
import Match from "../models/match.js";
import Announcement from "../models/announcements.js";

const getDashboardStats = async (req, res) => {
    try {
        
        const [
            totalPlayers,
            totalCoaches,
            totalMatches,
            upcomingMatches,
            completedMatches,
            totalAnnouncements
        ] = await Promise.all([
            Player.countDocuments(),
            Coach.countDocuments(),
            Match.countDocuments(),
            Match.countDocuments({ status: "upcoming" }),
            Match.countDocuments({ status: "completed" }),
            Announcement.countDocuments()
        ]);

        res.status(200).json({
            message: "Dashboard statistics retrieved succesfully",
            statistics: {
                totalPlayers,
                totalCoaches,
                totalMatches,
                upcomingMatches,
                completedMatches,
                totalAnnouncements
            }
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getRecentActivities = async (req, res) => {
    try {
        
        //recent players
        const recentPlayers = await Player.find()
          .populate("user", "fullname")
          .sort({ createdAt: -1 }) 
          .limit(5);

        const playerActivities = recentPlayers.map(player => ({
            type: "Player",
            title: `${player.user.fullname} joined the team`,
            date: player.createdAt
        }))  

        //recent coaches
        const recentCoaches = await Coach.find()
          .populate("user", "fullname")
          .sort({ createdAt: -1 })
          .limit(5)

        const coachActivities = recentCoaches.map(coach => ({
            type: "Coach",
            title: `${coach.user.fullname} joined the team`,
            date: coach.createdAt
        }))  

        //recent matches
        const recentMatches = await Match.find()
          .sort({createdAt: -1})
          .limit(5)

        const matchActivities = recentMatches.map(match => ({
            type: "Match",
            title: `${match.homeTeam} vs ${match.awayTeam} was created`,
            date: match.createdAt
        }))  

        //recent announcements
        const recentAnnouncements = await Announcement.find()
          .sort({createdAt: -1})
          .limit(5)

        const announcementActivities = recentAnnouncements.map(announcement => ({
            type: "Announcement",
            title: `${announcement.title} was published`,
            date: announcement.createdAt
        }))  

        //combine all activities
        const recentActivities = [
            ...playerActivities,
            ...coachActivities,
            ...matchActivities,
            ...announcementActivities
        ];

        //sort newest first
        recentActivities.sort((a,b) => new Date(b.date) - new Date(a.date));

        //keep only latest 10
        const latestActivities = recentActivities.slice(0, 10);

        //response
        res.status(200).json({
            message: "Recent activities retrieved succesfully",
            count: latestActivities.length,
            recentActivities: latestActivities
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export  {
    getDashboardStats, getRecentActivities
}