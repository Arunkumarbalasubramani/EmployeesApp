const express = require("express");
const Employees = require("../model/employees.model");

const router = express.Router();

//To Get All Employees
router.get("/employees", (req, res) => {
  try {
    const { email } = req.query;
    if (email) {
      Employees.find({ email }, (err, data) => {
        if (err) {
          return res.status(400).send(`Error While reteriving data - ${err}`);
        }
        return res.status(200).send(data);
      });
    } else {
      Employees.find((err, data) => {
        if (err) {
          return res.status(400).send(`Error While reteriving data - ${err}`);
        }
        return res.status(200).send(data);
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
});
//To Get  Employees By ID
router.get("/employees/:empID", (req, res) => {
  try {
    Employees.findOne({ _id: req.params.empID }, (err, data) => {
      if (err) {
        return res
          .status(400)
          .send(`message: Error While retriving data using Id - ${err}`);
      }
      return res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
});

//To   Create an Employee
router.post("/employees", (req, res) => {
  try {
    const data = req.body;
    const employee = new Employees(data);
    employee.save((err, data) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "Error While adding the Employee" });
      }
      return res
        .status(201)
        .send({ id: data._id, message: " employee added Succesfully" });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal ServerError" });
  }
});

// To Update an Employee
router.put("/employees/:empID", (req, res) => {
  try {
    const employeeID = req.params.empID;
    Employees.findByIdAndUpdate(
      { _id: employeeID },
      { $set: req.body },
      (err, data) => {
        if (err) {
          return res
            .status(400)
            .send({ Message: "Error while Updating the Employee Details" });
        }
        return res.status(201).send({
          id: data._id,
          Message: "Employee Details Updated Sucessfully ",
        });
      }
    );
  } catch (error) {
    res.status(500).send({ Message: "Internal Server Error" });
  }
});

// // To Delelte an Employee
router.delete("/employees/:empID", (req, res) => {
  try {
    const employeeID = req.params.empID;
    Employees.deleteOne(
      {
        _id: employeeID,
      },
      (err, data) => {
        if (err) {
          return res
            .status(400)
            .send(`Message:  Error While Deleting the Employee ${err}`);
        } else if (data.deletedCount > 0) {
          return res
            .status(200)
            .send({ Message: ` Employee deleted Successfully` });
        }
        return res.status(400).send({ Message: "Employee Not Found" });
      }
    );
  } catch (error) {
    res.status(500).send({ Message: "Internal Server Error" });
  }
});

module.exports = router;
