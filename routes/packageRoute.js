import express from "express";
import { addMultiplePackages, addPackage, getAllPackages, singlePackages } from "../controllers/packageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const packageRouter = express.Router();

packageRouter.post("/add",authMiddleware, addPackage);
packageRouter.get("/all", getAllPackages);
packageRouter.get("/single/:id", singlePackages);
packageRouter.post("/add-multiple",authMiddleware, addMultiplePackages);

export default packageRouter;
