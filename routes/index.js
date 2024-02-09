import express from "express";
import { createUser } from "../controllers/userController.js";
import { addCostItem, getReport } from "../controllers/costController.js";
import { createDeveloper, getAllDevelopers } from "../controllers/developerController.js";
const router = express.Router();

//GET Routes
router.get("/about", getAllDevelopers);
router.get("/report", getReport);

//POST Routes
router.post("/addcost", addCostItem);
router.post("/createuser", createUser);
router.post("/createdeveloper", createDeveloper);

export default router;
