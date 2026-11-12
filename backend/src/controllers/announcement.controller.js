import Announcement from "../models/announcements.js";
import fs from "fs";
import path from "path";
import cloudinary from "../config/cloudinary.js";

//create annoucement
const createAnnoucement = async (req, res) => {
    try {
        const { title, message } = req.body

        const existingAnnouncement = await Announcement.findOne({
            title,
            message
        })

        if (existingAnnouncement) {
            return res.status(400).json({
                message: "Announcement already exists"
            });
        };

        const author = req.user._id;

        const image = req.file
            ? {
                url: req.file.path,
                publicId: req.file.filename,
            }
            : {
                url: "",
                publicId: "",
            };

        const announcement = await Announcement.create({
            title,
            message,
            image,
            author
        });

        res.status(201).json({
            message: "Annoucement created succesfully",
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
        const { id } = req.params;

        const { title, message, image } = req.body

        //find announcement
        const announcement = await Announcement.findById(id);

        if (!announcement) {
            return res.status(404).json({
                message: "Announcement not found"
            });
        };

        announcement.title = req.body.title || announcement.title;
        announcement.message = req.body.message || announcement.message;
        // Keep track of the old Cloudinary image
        const oldImagePublicId = announcement.image?.publicId;

        // If a new image was uploaded
        if (req.file) {
            announcement.image = {
                url: req.file.path,
                publicId: req.file.filename,
            };
        }

        await announcement.save();

        // Delete the old image only after the announcement is successfully saved
        if (req.file && oldImagePublicId) {
            try {
                await cloudinary.uploader.destroy(oldImagePublicId);
            } catch (error) {
                console.error("Failed to delete old announcement image:", error);
            }
        }

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
        const { id } = req.params;

        const announcement = await Announcement.findById(id);

        if (!announcement) {
            return res.status(404).json({
                message: "Annoucement not found"
            });
        };

        // Delete the announcement image from Cloudinary
        if (announcement.image?.publicId) {
            try {
                await cloudinary.uploader.destroy(announcement.image.publicId);
            } catch (error) {
                console.error("Failed to delete announcement image:", error);
            }
        }

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

        //pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const title = req.query.title || "";

        const query = {};

        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            }
        }

        if (title) {
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
            image: announcement.image?.url || null,
            author: announcement.author.fullname,
            role: announcement.author.role,
            createdAt: announcement.createdAt
        }));

        res.status(200).json({
            message: "All Annoucements",
            currentPage: page,
            totalPages,
            totalAnnouncements,
            announcementsPerPage: limit,
            announcements: formattedAnnouncements,
            count: formattedAnnouncements.length,

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