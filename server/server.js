// Importing required modules
import express from "express";
import cors from "cors";

// Initializing the Express app
const app = express();

// Use middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Set the server port
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
