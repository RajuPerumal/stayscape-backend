import db from "../../lib/db.js";
import { ObjectId } from "mongodb";

/**
 * A function that returns all the reviews for a hotel
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async function (req, res) {
  try {
    const reviews = await db
      .collection("reviews")
      .find({ hotelId: new ObjectId(req.params.hotelId) })
      .toArray();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
