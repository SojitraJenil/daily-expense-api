const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const http = require("http");

const ChatMessage = require("./model/chat_model");

// Create Express app
const app = express();
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// MongoDB connection
mongoose
  .connect("mongodb+srv://jenil:jenil@cluster0.itjhhqs.mongodb.net/Expense")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Express middleware
app.use(cors());
app.use(express.json());

// Socket.IO event handlers
io.on("connection", (socket) => {
  socket.join("room1");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("send_message", async (data) => {
    const messageData = {
      author: data.author,
      message: data.message,
      room: data.room,
    };

    try {
      await ChatMessage.create(messageData);
      io.to("room1").emit("receive_message", messageData);

      console.log("Message sent to room:", data.room);
    } catch (error) {
      console.error("Error saving message to MongoDB:", error);
    }
  });

  socket.on("Hello", (Hello) => {
    console.log("Hello:", Hello);
  });

  socket.on("reconnect", () => {
    console.log(`User reconnected: ${socket.id}`);
  });
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await ChatMessage.find(); // Fetch all messages
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("ok");
});

// Export both app and server
module.exports = { app, server };
