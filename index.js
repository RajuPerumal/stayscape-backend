import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express, { json } from "express";
import cors from "cors";
import Auth from "./src/routes/auth.js";
import Hotels from "./src/routes/hotels.js";
import checkAuth from "./src/middlewares/checkAuth.js";
import db from "./src/lib/db.js";
import {ObjectId} from "mongodb";

config();

const app = express();

app.use(json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000", "https://stayscape-raju.netlify.com"],
  credentials: true,
}))
app.use("/auth", Auth);
app.use("/hotels", Hotels);
app.get("/get-user", checkAuth, async (req, res) => {
  const user = await db.collection("users").findOne({ _id: new ObjectId(res.locals.uid) });
  res.status(200).json(user);
});
app.post("/set-user", checkAuth, async (req, res) => {
  const user = req.body;
  delete user.password;
  await db.collection("users").updateOne({ _id: new ObjectId(res.locals.uid) }, { $set: user });
  res.status(200).json({ message: "User updated successfully" });
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
