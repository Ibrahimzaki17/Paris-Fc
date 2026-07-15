import User from "../models/user.js";
import Coach from "../models/coach.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Player from "../models/player.js";
import fs from "fs";
import path from "path";

//create coach = Add coach button
const createCoach = async (req, res) => {
  try {

    const {
      fullname,
      email,
      position,
      age,
      phone,
    } = req.body;

    const image = req.file ? req.file.filename : "";
    /*
    // Validation
    if (
      !fullname ||
      !email ||
      !position ||
      !age ||
      !phone 
    ) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        message: "All fields must be filled",
      });
    }
      */

    let session = await mongoose.startSession();
    session.startTransaction();

    // Check if user already exists
    const existing = await User.findOne({
      email: email.toLowerCase(),
    }).session(session);

    if (existing) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Temporary password
    const defaultPassword = "paris12345";

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Create User
    const user = await User.create(
      [
        {
          fullname,
          email: email.toLowerCase(),
          password: hashedPassword,
          role: "coach",
        },
      ],
      { session }
    );

    const positionOrderMap = {
        "head-coach": 1,
        "assistant-coach": 2
    };

    const positionOrder = positionOrderMap[position];

    // Create coach
    const coach = await Coach.create(
      [
        {
          user: user[0]._id,
          position,
          positionOrder,
          age,
          phone,
          image,
        },
      ],
      { session }
    );

    // Everything succeeded
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Coach created successfully",

      temporaryPassword: defaultPassword,

      user: {
        id: user[0]._id,
        fullname: user[0].fullname,
        email: user[0].email,
        role: user[0].role,
      },

      coach: {
        id: coach[0]._id,
        position: coach[0].position,
        age: coach[0].age,
        phone: coach[0].phone,
        image: coach[0].image,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      message: error.message,
    });
  }
};

//update coach = edit coach button
const editCoach = async (req, res) => {
    try {
        //get the id
        const {id} = req.params;

        //find the coach
        const coach = await Coach.findById(id);

        if(!coach) {
            return res.status(404).json({
                message: "coach not found"
            })
        }

        const user = await User.findById(coach.user);

        if (!user) {
             return res.status(404).json({
                 message: "User not found"
             });
        
        
        }

        user.fullname = req.body.fullname || user.fullname;
        // user.email = req.body.email || user.email;

        await user.save();

        coach.position = req.body.position || coach.position;
        // coach.age = req.body.age || coach.age;
        coach.phone = req.body.phone || coach.phone;
     // If a new image was uploaded
        if (req.file) {

            // Delete the old image (if there is one)
            if (coach.image) {

                const oldImagePath = path.join("uploads", coach.image);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }

            }

            // Save the new image filename
            coach.image = req.file.filename;
        }

        await coach.save();

        res.status(200).json({
            message: "coach updated successfully",
            user,
            coach
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//delete coach = delete coach button
const deleteCoach = async (req, res) => {
    try {
        const {id} = req.params;

        //find coach
        const coach = await Coach.findById(id);
        
        if(!coach) {
            return res.status(404).json({
                message: "coach not found"
            })
        }

        if (coach.image) {

            const imagePath = path.join("uploads", coach.image);

            if (fs.existsSync(imagePath)) {

                fs.unlinkSync(imagePath);

            }
        }

        //delete
        await coach.deleteOne();

        await User.findByIdAndDelete(coach.user);

        res.status(200).json({
            message: "coach deleted succesfully"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//get all coaches
const getAllCoaches = async (req, res) => {
    try {
        //find all coachs & populate
        const coaches = await Coach.find()
          .populate("user", "fullname email role")

        //formatted
        const formattedCoaches = coaches.map(coach => ({
            id: coach._id,
            fullname: coach.user.fullname,
            email: coach.user.email,
            role: coach.user.role,
            position: coach.position,
            age: coach.age,
            phone: coach.phone,
            image: coach.image
        }))

        if(coaches.length === 0) {
            res.status(200).json({
                message: "All coaches retrieved succesfully",
                coachs: []            
            })
        }

        res.status(200).json({
            message: "All the coaches",
            count: formattedCoaches.length,
            formattedCoaches
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//get one coach
const getCoach = async (req, res) => {
    try {
        //get id
        const {id} = req.params

        //find coach
        const coach = await Coach.findById(id)
          .populate("user", "fullname email");

        if(!coach) {
            return res.status(404).json({
                message: "coach not found"
            })
        }

        // Format the response
        const formattedCoach = {
            id: coach._id,
            fullname: coach.user.fullname,
            email: coach.user.email,
            role: coach.user.role,
            position: coach.position,
            age: coach.age,
            phone: coach.phone,
            image: coach.image
        };

        // Return coach
        res.status(200).json({
            message: "coach retrieved successfully",
            coach: formattedCoach
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//serach coach
const searchCoaches = async (req, res) => {
    try {

        const { search } = req.query;

        // Get all coachs and populate user details
        const coachs = await Coach.find()
            .populate("user", "fullname email role");

        // Filter coachs
        const filteredcoachs = coachs.filter((coach) =>
            coach.user.fullname
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        if (filteredcoachs.length === 0) {
            return res.status(404).json({
                message: "No coachs found"
            });
        }

        res.status(200).json({
            message: "coachs found",
            coachs: filteredcoachs
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export  {
    createCoach, editCoach, deleteCoach, getAllCoaches, getCoach, searchCoaches
}
