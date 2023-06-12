const mongoose = require('mongoose');

const consoleSchema = new mongoose.Schema({
    imageURL: {
        type: String,
        required: true
      },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Sony Playstation', 'Microsoft XBOX', 'Gaming Accessories']
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Console = mongoose.model('Console', consoleSchema);

module.exports = Console;
