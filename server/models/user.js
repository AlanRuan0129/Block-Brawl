import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// Define the user schema for MongoDB using Mongoose
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// Method to generate a JWT for a user
userSchema.methods.generateAuthToken = function () {
    // Sign a JWT using the user's ID and a secret key, set expiration to 7 days
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

// Create the User model based on the userSchema
const User = mongoose.model("user", userSchema);

export { User };
