import db from "../../lib/db.js";
import { ObjectId } from "mongodb";

/**
 * A function that saves a review
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async function (req, res) {
  try {
    const review = req.body;
    const [result] = await Promise.all([
      db.collection("reviews").insertOne({
        ...review,
        hotelId: new ObjectId(req.params.hotelId),
        uid: new ObjectId(res.locals.uid),
      }),
      db.collection('hotels').updateOne(
        { _id: new ObjectId(req.params.hotelId) },
        { $inc: { rating: review.rating, reviews: 1 } }
      )
    ]);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
