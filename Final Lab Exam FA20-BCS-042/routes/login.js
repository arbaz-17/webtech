const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password })
    .then((user) => {
      if (!user) {
        // Show Bootstrap alert and clear the fields
        return res.send('<script>alert("Invalid email or password"); window.location.href = "/";</script>');
      }

      // User credentials are correct, redirect to the dashboard
      res.redirect('/dashboard');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});
// Signup Route
router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }) // Check if the user already exists
    .then((existingUser) => {
      if (existingUser) {
        // User already exists, show an alert and clear the fields
        return res.send('<script>alert("User Already Exists"); window.location.href = "/";</script>');
      }

      // User does not exist, create a new user
      const user = new User({ email, password });
      return user.save(); // Save the new user
    })
    .then(() => {
      // User is successfully created or user already exists, redirect to the dashboard or perform any other action
      // You can modify this part based on your desired logic
      res.redirect('/dashboard');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;