const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: {
      type: String,
      required: true
    }, 
    product_id: {
        type: String,
        required: true
    },
    product_url: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    }
})

const cart = mongoose.model('Cart', userSchema);

module.exports = cart;