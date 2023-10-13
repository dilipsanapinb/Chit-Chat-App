const asynchandler = require('express-async-handler');
const { Message } = require('../models/messageModel');
const { User } = require('../models/userModel');
const { Chat } = require('../models/ChatModel');

// get all massage
const allMessages = asynchandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name pic email')
      .populate('chat')
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asynchandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log('Invalid Data passed into the request');
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
    createdAt:new Date()
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate('sender', 'name pic');
    message = await message.populate('chat');
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name pic email',
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteMessage = asynchandler(async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findById(messageId);
    if (!message) {
      res.status(404);
      throw new Error('Message not found');
    } else {
      await Message.findByIdAndDelete(messageId);
      res.json({ message: 'Message Deleted' });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = { sendMessage, allMessages, deleteMessage };
