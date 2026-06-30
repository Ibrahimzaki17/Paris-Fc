import Announcement from "../models/announcements.js";
import mongoose from "mongoose";
import User from "../models/user.js";

//create annoucement
const createAnnoucement = async (req, res) => {
    try {
        const {title,message,image} = req.body

        //basic validation
        if(!title || !message || !image) {
            return res.status(400).json({
                message: "All fields must filled"
            });
        };

        const existingAnnouncement = await Announcement.findOne({
            title,
            message
        })

        if(existingAnnouncement) {
            return res.status(400).json({
                message: "Announcement already exists"
            });
        };

        const author = req.user._id;

        const announcement = await Announcement.create({
            title,
            message,
            image,
            author
        });

        res.status(201).json({
            message: "Annoucement craeted succesfully",
            announcement: {
                id: announcement._id,
                title: announcement.title,
                message: announcement.message,
                image: announcement.image,
                author: req.user._id
            } 
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//edit annoucement
const editAnnouncement = async (req, res) => {
    try {
        const {id} = req.params;

        const {title,message,image} = req.body

        //find announcement
        const announcement = await Announcement.findById(id);

        if(!announcement) {
            return res.status(404).json({
                message: "Announcement not found"
            });
        };

        announcement.title = req.body.title || announcement.title;
        announcement.message = req.body.message || announcement.message;
        announcement.image = req.body.image || announcement.image;


        await announcement.save();

        res.status(200).json({
            message: "Announcement updated succesfully",
            announcement
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//delete annoucement
const deleteAnnoucement = async (req, res) => {
    try {
        const {id} = req.params;

        const announcement = await Announcement.findById(id);

        if(!announcement) {
            return res.status(404).json({
                message: "Annoucement not found"
            });
        };

        //delete
        await announcement.deleteOne();

        res.status(200).json({
            message: "Announcement deleted succesfully",
            announcement
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    };
}

//get all announcements
const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find()
           .populate("author", "fullname role");

        const formattedAnnouncements = announcements.map(announcement => ({
            id: announcement._id,
            title: announcement.title,
            message: announcement.message,
            image: announcement.image,
            author: announcement.author.fullname,
            role: announcement.author.role
        }));

        if(announcements.length === 0) {
            return res.status(200).json({
                message: "All annoucements retrieved succesfully",
                announcements: []
            })
        }

        res.status(200).json({
            message: "All Annoucements",
            count: formattedAnnouncements.length,
            announcements: formattedAnnouncements
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export {
    createAnnoucement, editAnnouncement, deleteAnnoucement, getAllAnnouncements
}