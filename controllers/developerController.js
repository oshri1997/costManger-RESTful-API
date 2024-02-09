import Developer from "../models/developerModel.js";

//POST Request
export const createDeveloper = async (req, res) => {
  try {
    // Create a new developer using the request body
    const newDeveloper = new Developer(req.body);
    await newDeveloper.save();

    // Send a success response with the created developer
    res.status(201).send({
      message: "Developer successfully created",
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
export const getAllDevelopers = async (req, res) => {
  try {
    //find all the developers without _id __v properties
    const AllDevelopers = await Developer.find().select("-_id -__v");
    if (!AllDevelopers) {
      return res.status(404).send({
        message: "Developers not found",
      });
    }
    // Send a success response with fetching all developers
    res.status(201).send(AllDevelopers);
    // Send an error response if the fetching developers fails
  } catch (error) {
    res.status(500).send({
      message: "Developers fetch failed",
      error: error.message,
    });
  }
};
