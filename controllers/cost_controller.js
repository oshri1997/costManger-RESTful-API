import CostItem from "../models/costs_model.js";
import User from "../models/user_model.js";
import categories from "../const.js";

//POST Request
export const addCostItem = async (req, res) => {
  try {
    //find the first user matches the userId
    const userExist = await User.findOne({ id: req.body.user_id });
    //user not exist
    if (!userExist) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    if (!req.body.year && !req.body.month && !req.body.day) {
      //if year, month, day are not provided set them to the current date
      req.body.year = new Date().getFullYear();
      req.body.month = new Date().getMonth() + 1;
      req.body.day = new Date().getDate();
    }
    if (!req.body.year || !req.body.month || !req.body.day) {
      //if year OR month OR day return error
      return res.status(400).send({
        message: "Year or Month or Day are required",
      });
    }
    // Create a new cost item using the request body
    const newCostItem = new CostItem(req.body);
    await newCostItem.save();

    // Send a success response with the created cost item
    res.status(201).send(newCostItem); // Assuming you want to return the created item to the client);
  } catch (error) {
    // Send an error response if the creation fails
    res.status(500).send({
      message: "Cost Item creation failed",
      error: error.message,
    });
  }
};

//GET Request
export const getReport = async (req, res) => {
  try {
    const { user_id, year, month } = req.query;
    const userExist = await User.findOne({ id: req.query.user_id });
    //user not exist
    if (!userExist) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const costs = await CostItem.find({ user_id, year, month });
    const reports = categories.reduce((acc, category) => {
      acc[category] = costs
        .filter((cost) => cost.category === category)
        .map(({ day, description, sum }) => ({ day, description, sum }));
      return acc;
    }, {});

    // Send a success response with the report cost item
    res.status(200).send(reports);
    // Send an error response if the report fails
  } catch (error) {
    res.status(400).send({
      message: "Report failed",
      error: error.message,
    });
  }
};
