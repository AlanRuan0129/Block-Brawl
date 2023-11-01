import express from "express";
import { createServer } from "http";
import { initSocketServer } from "./socket/index.js";
import cors from "cors";
import connectDB from "./db.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";

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

// Initialize Socket server
initSocketServer(httpServer);

// Connect to MongoDB and start the server
connectDB().then(() => {
    const port = process.env.PORT || 5000;
    httpServer.listen(port, () => {
        console.log(`httpServer is running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});
