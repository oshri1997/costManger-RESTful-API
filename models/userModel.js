const mongoose = require("mongoose");

//Creating a new Schema(collection) of developers
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "User property must include ID!"],
  },
  firstName: {
    type: String,
    required: [true, "User property must include first name!"],
  },
  lastName: {
    type: String,
    required: [true, "User property must include last name!"],
  },
  birthday: {
    type: String,
    required: [true, "User property must include birthday!"],
  },
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
