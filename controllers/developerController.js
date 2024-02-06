const Developer = require("../models/developerModel");

//POST Request
exports.createDeveloper = async (req, res) => {
  try {
    // Create a new developer using the request body
    const newDeveloper = new Developer(req.body);
    await newDeveloper.save();

    // Send a success response with the created developer
    res.status(201).send({
      message: "Developer successfully created",
      data: newDeveloper,
    });
  } catch (error) {
    // Send an error response if the creation fails
    res.status(500).send({
      message: "Developer creation failed",
      error: error.message,
    });
  }
};

//GET Request
exports.getAllDevelopers = async (req, res) => {
  let message = "";
  try {
    //find all the developers without _id __v properties
    const AllDevelopers = await Developer.find().select("-_id -__v");

    if (!AllDevelopers) message = "No developers found!";
    else message = "Developers fetched successfully";

    // Send a success response with fetching all developers
    res.status(201).send({
      message,
      data: AllDevelopers,
    });
    // Send an error response if the fetching developers fails
  } catch (error) {
    res.status(500).send({
      message: "Developers fetch failed",
      error: error.message,
    });
  }
};
