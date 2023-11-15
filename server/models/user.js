import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// Define the user schema for MongoDB using Mongoose
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Method to generate a JWT for a user
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

// Create the User model based on the userSchema
const User = mongoose.model("user", userSchema);

export { User };
