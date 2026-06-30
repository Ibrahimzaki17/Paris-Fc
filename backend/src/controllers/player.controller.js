import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import Player from "../models/player.js";
import mongoose from "mongoose";

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
}

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
      image,
    } = req.body;

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

//get player = login page
const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;

        //validation
        if(!email || !password) {
            return res.status(400).json({
                message: "email and password are required"
            })
        }
        
        //check if user already exists
        const user = await User.findOne({
            email: email.toLowerCase()
        }).select("+password");

        if(!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        //if user exists compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                message: "incorrect password"
            })
        }

        //update login status
        user.loggedIn = true;
        await user.save();

        const token = generateToken(user._id);

        res.status(202).json({
            message: `Welcome ${user.fullname}`,
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

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
        player.image = req.body.image || player.image;

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
    createPlayer, loginUser, deletePlayer, editPlayer, getAllPlayers, getPlayer, searchPlayers
}
