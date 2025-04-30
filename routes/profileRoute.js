import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUser, updateUser } from "../controllers/userController.js";

const profileRoute = express.Router();

profileRoute.get("/data", authMiddleware, getUser);
profileRoute.post("/profile", authMiddleware, updateUser);

export default profileRoute;
