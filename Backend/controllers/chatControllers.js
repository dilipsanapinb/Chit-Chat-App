const asynchandler = require('express-async-handler');
const { Chat } = require("../models/ChatModel")
const { User } = require("../models/userModel")


// get all chat
const getChat = asynchandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({updatedAt:-1})
            .then(async (results) => {
                results = await User.populate(results, {
                    path: 'latestMessage.sender',
                    select: "name pic email"
                });
                res.status(200).send(results)
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});