import mongoose from "mongoose";

//Creating a new Schema(collection) of developers
const developerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "Developer property must include ID!"],
  },

  first_name: {
    type: String,
    required: [true, "Developer property must include first name!"],
  },
  last_name: {
    type: String,
    required: [true, "Developer property must include last name!"],
  },
  email: {
    type: String,
    required: [true, "Developer property must include email!"],
    match: [
      // Check if the value is valid email
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
});

const Developer = mongoose.model("Developer", developerSchema);
export default Developer;
