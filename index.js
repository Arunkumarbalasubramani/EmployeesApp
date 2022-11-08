require("dotenv").config();
const express = require("express");
const connection = require("./db/connection");
const employeeRoutes = require("./routes/employees.route.js");

const app = express();
connection();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to my app");
});
app.use(employeeRoutes);
app.listen(PORT, () => {
  console.log(`App Started on PORT ${PORT} `);
});

// get-/employees
// get single emp -/employees/:empId
//post -/employees
//put -/employees/:empId
//delete -/employees/:empId
