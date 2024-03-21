import Developer from "../models/developer_model.js";

//GET Request
export const getAllDevelopers = async (req, res) => {
  try {
    //find all the developers without _id __v properties
    const allDevelopers = await Developer.find().select("-_id -__v");
    if (!allDevelopers) {
      return res.status(404).send({
        message: "Developers not found",
      });
    }
    // Send a success response with fetching all developers
    res.status(200).send(allDevelopers);
    // Send an error response if the fetching developers fails
  } catch (error) {
    res.status(500).send({
      message: "Developers fetch failed",
      error: error.message,
    });
  }
};
