const express = require('express');
const router = express.Router();

// Handle form submission
router.post('/login', async(req, res) => {
  // Perform login logic and validation here
  
  // If login is successful, render the dashboard.ejs file
  console.log("I am in Login route")
  res.redirect('/dashboard');
});

module.exports = router;
