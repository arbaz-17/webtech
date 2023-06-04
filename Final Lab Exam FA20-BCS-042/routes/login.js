const express = require('express');
const router = express.Router();

// Handle form submission
router.post('/login', (req, res) => {
  // Perform login logic and validation here
  
  // If login is successful, render the dashboard.ejs file
  res.render('dashboard', { games });
});

module.exports = router;
