import { ObjectId } from "mongodb";
import db from "../../lib/db.js";

/**
 * A function that saves a booking
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async function (req, res) {
  try {
    const booking = req.body;
    await db
      .collection("bookings")
      .insertOne({
        ...booking,
        uid: new ObjectId(res.locals.uid),
        hotelId: new ObjectId(req.params.hotelId),
        createdAt: new Date(),
      });
    res.status(201).json({ message: "Booking successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
