
// routes/games.js

const express = require('express');
const router = express.Router();

const Game = require('../models/Game');

// POST method - Create a new game
router.post('/', async (req, res) => {
  try {
    const { name, price } = req.body;
    const game = new Game({ name, price });
    await game.save();
    res.status(201).json(game);
    console.log('POST request received');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create game' });
  }
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

// GET method - Retrieve a specific game by ID
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve game' });
  }
});

// PUT method - Update a game
router.put('/:id', async (req, res) => {
  try {
    const { name, price } = req.body;
    const game = await Game.findByIdAndUpdate(req.params.id, { name, price }, { new: true });
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update game' });
  }
});

// DELETE method - Delete a game
router.delete('/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete game' });
  }
});

module.exports = router;