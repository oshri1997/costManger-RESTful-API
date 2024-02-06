const CostItem = require("../models/costsItemModel");
const User = require("../models/userModel");
const { Categories } = require("../const");

//POST Request
exports.addCostItem = async (req, res) => {
  try {
    //find the first user matches the userId
    const userExist = await User.findOne({ id: req.body.userId });
    //user not exist
    if (!userExist) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    // Create a new cost item using the request body
    const newCostItem = new CostItem(req.body);
    await newCostItem.save();
    const newCostItemObject = newCostItem.toObject();
    // Delete _id and __v properties from the plain JavaScript object
    delete newCostItemObject._id;
    delete newCostItemObject.__v;

    // Send a success response with the created cost item
    res.status(201).send({
      message: "Cost Item successfully created",
      data: newCostItemObject, // Assuming you want to return the created item to the client
    });
  } catch (error) {
    // Send an error response if the creation fails
    res.status(500).send({
      message: "Cost Item creation failed",
      error: error.message,
    });
  }
};

//GET Request
exports.getReport = async (req, res) => {
  try {
    const { userId, year, month } = req.query;

    const costs = await CostItem.find({ userId, year, month });
    const reports = Categories.reduce((acc, category) => {
      acc[category] = costs
        .filter((cost) => cost.category === category)
        .map(({ day, description, sum }) => ({ day, description, sum }));
      return acc;
    }, {});

    // Send a success response with the report cost item
    res.status(201).send({
      message: "Report successfully fetched",
      data: reports,
    });
    // Send an error response if the report fails
  } catch (error) {
    res.status(400).send({
      message: "Report failed",
      error: error.message,
    });
  }
};
