import Message from "../models/message.js";
import mongoose from "mongoose";

const createMessage = async (req, res) => {
    try {
        
        const {name, email, message} = req.body;

        if(!name || !email || !message) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newMessage = new Message({
            name,
            email,
            message
        })

        await newMessage.save();

         return res.status(201).json({
            message: "Message sent succesfully",
            newMessage
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const getMessage = async (req, res) => {
    try {
        //find all messages and sort by date
        const messages = await Message.find()
          .sort( {createdAt: -1} )

        //format
        const formattedMessages = messages.map(message => ({
            id: message.id,
            name: message.name,
            email: message.email,
            message: message.message,
            read: message.read,
            createdAt: message.createdAt
        }))

        return res.status(200).json({
            message: "All the messages",
            count: formattedMessages.length,
            messages: formattedMessages
        })
          
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


const markMessageAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid message ID"
            });
        }

        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { read: true },
            { returnDocument: "after", runValidators: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        return res.status(200).json({
            message: "Message marked as read successfully",
            data: updatedMessage
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


const deleteMessage = async (req, res) => {
    try {
        const {id} = req.params;

        //find message
        const message_ = await Message.findById(id);

        if(!message_) {
            return res.status(404).json({
                message: "Message not found"
            })
        }

        await message_.deleteOne();

        return res.status(200).json({
            message: "Message deleted successfully",
            message_
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const deleteAllMessages = async (req, res) => {
    try {
        const allMessages = await Message.deleteMany( {} );

        if(allMessages.deletedCount === 0) {
            return res.status(200).json({
                message: "No messages to delete",
                deletedCount: 0
            })
        } 

        return res.status(200).json({
            message: "All messages deleted successfully",
            deletedCount: allMessages.deletedCount
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export { createMessage, getMessage, deleteMessage, deleteAllMessages, markMessageAsRead }