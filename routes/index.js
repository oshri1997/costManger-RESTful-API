const express = require("express");
const { createUser } = require("../controllers/userController");
const { getReport, addCostItem } = require("../controllers/costController");
const { getAllDevelopers, createDeveloper } = require("../controllers/developerController");
const router = express.Router();

//GET Routes
router.get("/about", getAllDevelopers);
router.get("/report", getReport);

//POST Routes
router.post("/addcost", addCostItem);
router.post("/createuser", createUser);
router.post("/createdeveloper", createDeveloper);

module.exports = router;
