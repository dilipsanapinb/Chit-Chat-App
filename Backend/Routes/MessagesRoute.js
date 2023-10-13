const express = require("express");
const { Message } = require("../models/messageModel");
const { auth } = require("../middleWares/authMiddleware");
const {sendMessage,allMessages, deleteMessage} =require("../controllers/MessageController")
const messageRouter = express.Router();

messageRouter.route("/").post(auth,sendMessage)
messageRouter.route("/:chatId").get(auth, allMessages)
messageRouter.route('/delete/:messageId').delete(auth, deleteMessage);

module.exports={messageRouter}