import mongoose from "mongoose";
import { Categories, Months } from "../const.js";
import { isValidDay } from "../utlis.js";

//Creating a new Schema(collection) of costs
const costItemSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: [true, "Cost item must include a user ID!"],
  },

  year: {
    type: Number,
    required: [true, "Cost item must include a year!"],
  },

  month: {
    type: Number,
    required: [true, "Cost item must include a month!"],
    min: 1,
    max: 12,
  },

  day: {
    //only days that matches the correspond months
    type: Number,
    required: [true, "Cost item must include a day!"],
    validate: {
      validator: function (value) {
        // Get the year and month from the document
        const year = this.year;
        const monthIndex = Months.indexOf(this.month) + 1; // Adjust month value for Date constructor

        // Validate the day for the given month and year
        return isValidDay(year, monthIndex, value);
      },
      message: (props) => `${props.value} is not a valid day for the provided month and year!`,
    },
  },

  id: {
    type: Number,
    default: new Date().getTime(), //unique id
  },

  description: {
    type: String,
    required: [true, "Cost item must include a description!"],
  },

  category: {
    type: String,
    required: [true, "Cost item must include a category!"],
    validate: {
      //Only Categories like Food Housing etc....
      validator: function (value) {
        return Categories.includes(value);
      },
      message: (props) => `${props.value} is not a valid category!`,
    },
  },

  sum: {
    type: Number,
    required: [true, "Cost item must include a sum!"],
    min: 0,
  },
});

const CostItem = mongoose.model("Costs", costItemSchema);
export default CostItem;
