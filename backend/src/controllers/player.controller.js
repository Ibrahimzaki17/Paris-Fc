import User from "../models/user.js";
import bcrypt from "bcrypt";
import Player from "../models/player.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

//create player = Add player button
const createPlayer = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const {
      fullname,
      email,
      position,
      age,
      phone,
      jerseyNumber,
    } = req.body;

    const image = req.file
        ? req.file.filename
        : "";

    // Validation
    if (
      !fullname ||
      !email ||
      !position ||
      !age ||
      !phone ||
      !jerseyNumber
    ) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        message: "All fields must be filled",
      });
    }

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
          role: "player",
        },
      ],
      { session }
    );

    // Create Player
    const player = await Player.create(
      [
        {
          user: user[0]._id,
          position,
          age,
          phone,
          jerseyNumber,
          image,
        },
      ],
      { session }
    );

    // Everything succeeded
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Player created successfully",

      temporaryPassword: defaultPassword,

      user: {
        id: user[0]._id,
        fullname: user[0].fullname,
        email: user[0].email,
        role: user[0].role,
      },

      player: {
        id: player[0]._id,
        position: player[0].position,
        age: player[0].age,
        phone: player[0].phone,
        jerseyNumber: player[0].jerseyNumber,
        image: player[0].image,
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

//update player = edit player button
const editPlayer = async (req, res) => {
    try {
        //get the id
        const {id} = req.params;

        //find the player
        const player = await Player.findById(id);

        if(!player) {
            return res.status(404).json({
                message: "Player not found"
            })
        }

        const user = await User.findById(player.user);

        if (!user) {
             return res.status(404).json({
                 message: "User not found"
             });
        
        
        }

        user.fullname = req.body.fullname || user.fullname;
        user.email = req.body.email || user.email;

        await user.save();

        player.position = req.body.position || player.position;
        player.age = req.body.age || player.age;
        player.phone = req.body.phone || player.phone;
        player.jerseyNumber = req.body.jerseyNumber || player.jerseyNumber;
     // If a new image was uploaded
        if (req.file) {

            // Delete the old image (if there is one)
            if (player.image) {

                const oldImagePath = path.join("uploads", player.image);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }

            }

            // Save the new image filename
            player.image = req.file.filename;
        }

        await player.save();

        res.status(200).json({
            message: "Player updated successfully",
            user,
            player
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//delete player = delete player button
const deletePlayer = async (req, res) => {
    try {
        const {id} = req.params;

        //find player
        const player = await Player.findById(id);
        
        if(!player) {
            return res.status(404).json({
                message: "Player not found"
            })
        }

        if (player.image) {

            const imagePath = path.join("uploads", player.image);

            if (fs.existsSync(imagePath)) {

                fs.unlinkSync(imagePath);

            }
        }

        //delete
        await player.deleteOne();

        await User.findByIdAndDelete(player.user);

        res.status(200).json({
            message: "Player deleted succesfully"
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//get all players
const getAllPlayers = async (req, res) => {
    try {
        //find all players & populate
        const players = await Player.find()
          .populate("user", "fullname email role")

        //formatted
        const formattedPlayers = players.map(player => ({
            id: player._id,
            fullname: player.user.fullname,
            email: player.user.email,
            role: player.user.role,
            position: player.position,
            age: player.age,
            phone: player.phone,
            jerseyNumber: player.jerseyNumber,
            image: player.image
        }))

        if(players.length === 0) {
            res.status(200).json({
                message: "All players retrieved succesfully",
                players: []            
            })
        }

        res.status(200).json({
            message: "All the players",
            count: formattedPlayers.length,
            formattedPlayers
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//get one player
const getPlayer = async (req, res) => {
    try {
        //get id
        const {id} = req.params

        //find player
        const player = await Player.findById(id)
          .populate("user", "fullname email");

        if(!player) {
            return res.status(404).json({
                message: "Player not found"
            })
        }

        // Format the response
        const formattedPlayer = {
            id: player._id,
            fullname: player.user.fullname,
            email: player.user.email,
            role: player.user.role,
            position: player.position,
            age: player.age,
            phone: player.phone,
            jerseyNumber: player.jerseyNumber,
            image: player.image
        };

        // Return player
        res.status(200).json({
            message: "Player retrieved successfully",
            player: formattedPlayer
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//serach player
const searchPlayers = async (req, res) => {
    try {

        const { search } = req.query;

        // Get all players and populate user details
        const players = await Player.find()
            .populate("user", "fullname email role");

        // Filter players
        const filteredPlayers = players.filter((player) =>
            player.user.fullname
                .toLowerCase()
                .includes(search.toLowerCase())
        );

        if (filteredPlayers.length === 0) {
            return res.status(404).json({
                message: "No players found"
            });
        }

        res.status(200).json({
            message: "Players found",
            players: filteredPlayers
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export {
    createPlayer, deletePlayer, editPlayer, getAllPlayers, getPlayer, searchPlayers
}


/**
 * A rule I personally follow

Whenever I'm writing an update controller, I mentally divide it into seven sections:

1. Get ID

2. Find document

3. Validation / Business logic

4. Update text fields

5. Handle uploaded files

6. Save

7. Return response
 */