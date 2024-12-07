import db from "../../lib/db.js";
import { ObjectId } from "mongodb";

/**
 * Returns all the bookings for a user
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async function (req, res) {
  try {
    const bookings = await db
      .collection("bookings")
      .find({ uid: new ObjectId(res.locals.uid) }, {sort: {createdAt: -1}})
      .toArray();

    for (let i = 0; i < bookings.length; i++) {
      const hotel = await db
        .collection("hotels")
        .findOne({ _id: new ObjectId(bookings[i].hotelId) });
      bookings[i].hotel = hotel;
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
