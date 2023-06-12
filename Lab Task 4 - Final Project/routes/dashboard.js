const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const User = require('../models/user');
const isAuthenticated = require('../middleware/auth'); 


router.get('/', isAuthenticated, async (req, res) => {
  try {
    console.log("Inside dashboard.js file");
    const games = await Game.find();
    res.render('dashboard', { games, role: req.user, layout: 'layout0'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve games' });
  }
});

module.exports = router;


