const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.render('dashboard', { games });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve games' });
  }
});

module.exports = router;
