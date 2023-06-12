const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: String,
    enum: ['Action', 'Fighting', 'Racing', 'Role Playing', 'Sci-Fi', 'Sports', 'War'],
  },
  imgURL: String,
  description: String,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
