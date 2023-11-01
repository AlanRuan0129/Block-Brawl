import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Endpoint to authenticate a user
router.post("/", async (req, res) => {
    try {
        // Find a user with the provided email
        const user = await User.findOne({ email: req.body.email });

        // If user is not found, send an error response
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });

        // Check if the provided password matches the stored hash
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        // If the password is not valid, send an error response
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        // Generate an authentication token for the user
        const token = user.generateAuthToken();

        // Send back the token in the response
        res.status(200).send({ data: token, message: "logged in successfully" });

    } catch (error) {
        // If there's any error in the process, log the error and send a 500 response
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

export default router;
