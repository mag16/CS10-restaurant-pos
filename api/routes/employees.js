const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Require Employee Model
const Employee = require('../models/Employee');

// @route   GET api/employees/test
// @desc    Tests employees' route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Employee Routes Work' }));

// @route   POST api/employees/add
// @desc    Adds a new user to the DB
// @access  Public
router.post('/register', (req, res) => {
  // Create a new employee
  const newEmployee = new Employee({
    name: req.body.name,
    pin: req.body.pin,
    password: req.body.password,
    status: {
      admin: req.body.status.admin,
      manager: req.body.status.manager,
    },
  });

  newEmployee
    .save()
    .then(employee => {
      res.status(200).json(employee);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   POST api/employees/login
// @desc    Lets a user login
// @access  Public
router.post('/login', (req, res) => {
  // Pull off the pin and pass from the request
  const { pin, password } = req.body;

  // Find the employee in the DB
  Employee.findOne({ pin })
    .then(employee => {
      if (!employee) {
        return res.status(404).json({ error: 'No employee found!' });
      } else {
        // Check the password on the model
        if (employee.password === password) {
          res.status(200).json(employee);
        }
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// @route   PUT api/employees/update/:pin
// @desc    Allow a user to change their password
// @access  Private
router.put('/update/:pin', (req, res) => {
  // Pull off the pin, oldPassword, and newPassword from the request
  const { oldPassword, newPassword } = req.body;
  const { pin } = req.params;

  // Locate the employee
  Employee.findOne({ pin })
    .then(employee => {
      if (!employee) {
        return res.status(404).json({ error: 'No employee found!' });
      } else {
        // Check the password on the model
        if (employee.password === oldPassword) {
          employee.password = newPassword;
          employee.save().then(employee => {
            res.status(200).json(employee);
          });
        }
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
