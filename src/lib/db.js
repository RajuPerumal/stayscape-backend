import {config} from "dotenv";
import { MongoClient } from "mongodb";

config();

const connectionString = process.env.MONGODB_URL || "";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}
let db = conn.db("hotel-app");
export default db;