import bcrypt from "bcrypt";
import db from "../../lib/db.js";
import jwt from "jsonwebtoken";

/**
 * A function that handles the login route
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = await db.collection("users").findOne({ email: email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      const userToSend = { ...user };
      delete userToSend.password;

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      });

      res.cookie("session", token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
      });

      return res.status(200).json(userToSend);
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
}