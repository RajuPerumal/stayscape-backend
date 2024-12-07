import bcrypt from "bcrypt";
import db from "../../lib/db.js";
import jwt from "jsonwebtoken";

/**
 * A function that handles the signup route
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async function (req, res) {
  try {
    const body = req.body;

    if (!body.email || !body.password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const existingUser = await db
      .collection("users")
      .findOne({ email: body.email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    bcrypt.hash(body.password, 10, async (err, hash) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      const user = {
        ...body,
        password: hash,
      };
      delete user.confirmPassword;

      try {
        const result = await db.collection("users").insertOne(user);
        delete user.password;
        const token = jwt.sign({ id: result.insertedId.toString() }, process.env.JWT_SECRET, {});
        res.cookie('session', token, { httpOnly: true, sameSite: 'none' });
        res.status(201).json({ ...user, uid: result.insertedId.toString() });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
