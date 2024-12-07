import {Router} from "express";
import signup from "../controllers/auth/signup.js";
import login from "../controllers/auth/login.js";
import logout from "../controllers/auth/logout.js";

const route = Router();

route.post('/login', login)
route.post("/signup", signup);
route.get("/logout", logout);

export default route