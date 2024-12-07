import { ObjectId } from "mongodb";
import db from "../../lib/db.js";

/**
 * A function that returns a hotel by id
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export default async function (req, res) {
  try {
    const { id } = req.params;
    const hotel = await db.collection("hotels").findOne({ _id: new ObjectId(id) });
    res.status(200).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}