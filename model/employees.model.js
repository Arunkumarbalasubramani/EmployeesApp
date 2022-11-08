const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Employees", employeeSchema);
