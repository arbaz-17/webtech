const express = require('express');
const router = express.Router();
const Console = require('../models/Console');
const User = require('../models/user');
const isAuthenticated = require('../middleware/auth');

router.get('/', isAuthenticated, async (req, res) => {
  try {
    console.log("Inside console.js file");
    const consoles = await Console.find();
    res.render('console', { consoles, role: req.user, layout: 'layout0' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve consoles' });
  }
});

module.exports = router;
