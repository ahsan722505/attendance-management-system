const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: Number,
    required: true,
  },
  presents: {
    type: Number,
    required: true,
  },
  absents: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Student", studentSchema);
