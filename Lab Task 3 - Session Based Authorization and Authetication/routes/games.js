
const express = require('express');
const router = express.Router();

const Game = require('../models/Game');

// POST Method
router.post('/', async (req, res) => {
  try {
    const { name, price, category, description, imgURL } = req.body;
    const game = new Game({ name, price, category, description, imgURL });
    await game.save();
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create game' });
  }
});

//Delete Method
router.post("/delete", async (req, res) => {
  try {
    const deleted = await Game.findByIdAndDelete(req.body.id);
    if (!deleted) {
      console.log('Game not found.');
    } else {
      console.log('Game deleted successfully.');
    }
  } catch (err) {
    console.error(err);
  }
  res.redirect('/dashboard');
});


// GET method - Retrieve all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve games' });
  }
});


// PUT Method
router.post('/update', async (req, res) => {
  try {
    const { id, name, price } = req.body;
    const game = await Game.findByIdAndUpdate(id, { name, price }, { new: true });
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    console.log('In Updating Function');
    res.redirect('/dashboard')
  } catch (error) {
    res.status(500).json({ error: 'Failed to update game' });
  }
});


module.exports = router;