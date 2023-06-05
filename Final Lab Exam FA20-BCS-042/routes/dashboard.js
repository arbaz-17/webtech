const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('dashboard', { categories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
});

module.exports = router;
