import {Router} from "express";
import getHotels from "../controllers/hotels/getHotels.js";
import getHotelById from "../controllers/hotels/getHotelById.js";
import addReview from "../controllers/hotels/addReview.js";
import checkAuth from "../middlewares/checkAuth.js";
import getReviews from "../controllers/hotels/getReviews.js";
import bookHotels from "../controllers/hotels/bookHotels.js";
import getBookings from "../controllers/hotels/getBookings.js";

const route = Router()

route.get('/', getHotels)
route.get("/bookings", checkAuth, getBookings)
route.get('/:id', getHotelById)
route.post("/reviews/:hotelId", checkAuth, addReview)
route.get("/reviews/:hotelId", getReviews)
route.post("/:hotelId/book", checkAuth, bookHotels)

export default route