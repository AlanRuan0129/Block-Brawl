import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const router = express.Router();

// Endpoint to register a new user
router.post("/", async (req, res) => {
    try {
        // Check if a user with the provided email already exists
        const user = await User.findOne({ email: req.body.email });

        // If user exists, send a conflict status
        if (user) {
            return res.status(409).send({ message: "User with given email already exists!" });
        }

        // If user doesn't exist, hash the provided password
        const hashPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT));

        // Create a new user record with the hashed password
        const newUser = await new User({ ...req.body, password: hashPassword }).save();

        // Respond with a success status and the new user's ID
        res.status(201).send({ message: "User created successfully", userId: newUser._id });

    } catch (error) {
        // If there's any error in the process, log the error and send a 500 response
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

export default router;
