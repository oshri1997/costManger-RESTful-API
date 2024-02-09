import User from "../models/userModel.js";

//POST Request
export const createUser = async (req, res) => {
  try {
    // Create a new user item using the request body
    const newUser = new User(req.body);
    await newUser.save();
    // Send a success response with the created user
    res.status(201).send({
      message: "User successfully created",
    });
  } catch (error) {
    // Send an error response if the creation fails
    res.status(500).send({
      message: "User creation failed",
      error: error.message,
    });
  }
};
