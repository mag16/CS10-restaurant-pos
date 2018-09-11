const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

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
  const { role } = req.body;
  // Create a new employee
  const newEmployee = new Employee({
    name: req.body.name,
    pin: req.body.pin,
    password: req.body.pass,
    role: { ...role },
  });

  // Check if the DB is empty or not
  Employee.find({}).then(employee => {
    if (employee.length === 0) {
      newEmployee.role.admin = true;
    }

    newEmployee
      .save()
      .then(employee => {
        res.status(200).json(employee);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
});

// @route   POST api/employees/login
// @desc    Lets a user login
// @access  Public
router.post('/login', (req, res) => {
  // Pull off the pin and pass from the request
  const { pin, pass } = req.body;

  // Find the employee in the DB
  Employee.findOne({ pin })
    .then(employee => {
      if (!employee) {
        return res.status(404).json({ error: 'No employee found!' });
      } else {
        // Check the password on the model
        employee.checkPassword(pass).then(verified => {
          if (verified) {
            // Create a payload
            const payload = {
              id: employee.id,
              pin: employee.pin,
              role: {
                admin: employee.role.admin,
                manager: employee.role.manager,
              },
            };

            // Sign the token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: '1d' },
              (err, token) => {
                res.json({ token: 'Bearer ' + token });
              },
            );
          } else {
            res.status(401).json({ error: 'Invalid credentials!' });
          }
        });
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

// @route   GET server/employees/current
// @desc    Return current employee
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      pin: req.user.pin,
      role: req.user.role,
    });
  },
);

module.exports = router;
