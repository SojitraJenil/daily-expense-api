const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  author: String,
  message: String,
  room: String,
  createdAt: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

module.exports = ChatMessage;
