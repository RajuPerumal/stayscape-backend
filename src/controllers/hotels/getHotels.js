import db from "../../lib/db.js";

/**
 * A function that returns all the hotels
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async function (req, res) {
  try {
    const hotels = await db.collection("hotels").find().toArray();
    res.status(200).json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}