import express from "express";
import { createServer } from "http";
import { initSocketServer, getSocketIO } from "./socket/index.js";
import cors from "cors";
import connectDB from "./db.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import {
  CreateRoomOn,
  JoinRoomOn,
  PlayerReadyOn,
  PlayerUnReadyOn,
  StartGameOn,
  UpdateConfigOn,
  OnRoomInformationRequest,
} from "./socket/on.js";

// Load environment variables
dotenv.config();

// Initialize Express app and create HTTP server
const app = express();
const httpServer = createServer(app);

// Middlewares for JSON parsing, CORS handling, and routes
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
import { Server } from "socket.io";

// Initialize Socket server
initSocketServer(httpServer);

const io = getSocketIO();

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  CreateRoomOn(socket);
  JoinRoomOn(socket);
  PlayerReadyOn(socket);
  PlayerUnReadyOn(socket);
  UpdateConfigOn(socket);
  StartGameOn(socket);
  OnRoomInformationRequest(socket);
});

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    const port = process.env.PORT || 5000;
    httpServer.listen(port, () => {
      console.log(`httpServer is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
