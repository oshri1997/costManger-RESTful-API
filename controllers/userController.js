const User = require("../models/userModel");

//POST Request
exports.createUser = async (req, res) => {
  try {
    // Create a new user item using the request body
    const newUser = new User(req.body);
    const newUserData = await newUser.save();
    const userDataObject = newUserData.toObject();

    // Delete _id and __v properties from the plain JavaScript object
    delete userDataObject._id;
    delete userDataObject.__v;

    // Send a success response with the created user
    res.status(201).send({
      message: "User successfully created",
      data: userDataObject,
    });
  } catch (error) {
    // Send an error response if the creation fails
    res.status(500).send({
      message: "User creation failed",
      error: error.message,
    });
  }
};
