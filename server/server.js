// Importing required modules
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initializing the Express app
const app = express();

// Use middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB and start the server
connectDB().then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});
