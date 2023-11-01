// Importing required modules
import express from "express";
import { createServer } from "http";
import { initSocketServer } from "./socket/index.js";
import cors from "cors";
import connectDB from "./db.js";
import dotenv from "dotenv";


dotenv.config();


const app = express();
const httpServer = createServer(app);


app.use(express.json());
initSocketServer(httpServer);
app.use(cors());


connectDB().then(() => {
    const port = process.env.PORT || 5000;
    httpServer.listen(port, () => {
        console.log(`httpServer is running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});
