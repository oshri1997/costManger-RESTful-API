import express from "express";
import { addCostItem, getReport } from "../controllers/cost_controller.js";
import { getAllDevelopers } from "../controllers/developer_controller.js";
const router = express.Router();

//GET Routes
router.get("/about", getAllDevelopers);
router.get("/report", getReport);

//POST Routes
router.post("/addcost", addCostItem);

export default router;
