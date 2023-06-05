

const express = require('express');
const router = express.Router();

const Category = require('../models/Category');

// POST method - Create a new category
router.post('/', async (req, res) => {
  try {
    const { title, published, description } = req.body;
    const category = new Category({ title, published, description });
    await category.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// GET method
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
});

// GET method -
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve category' });
  }
});

// PUT method 
router.put('/:id', async (req, res) => {
  try {
    const { title, published, description } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, { title, published, description }, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    console.log("Updated Successful")
    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// DELETE method 
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});


router.get('/dashboard', (req, res) => {

  res.render('dashboard');
});

module.exports = router;
