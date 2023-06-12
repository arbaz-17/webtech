const express = require('express');
const router = express.Router();

const Console = require('../models/Console');

// POST method 
router.post('/', async (req, res) => {
    try {
      const { name, category, price, description, imageURL } = req.body;
      const console = new Console({ name, category, price, description, imageURL });
      await console.save();
      res.redirect('/consoles2');
    } catch (error) {
      res.status(500).json({ error: 'Failed to create console' });
    }
  });

  // DELETE Method
  router.post("/delete", async (req, res) => {
    try {
      const deleted = await Console.findByIdAndDelete(req.body.id);
      if (!deleted) {
        console.log('Console not found.');
      } else {
        console.log('Console deleted successfully.');
      }
    } catch (err) {
      console.error(err);
    }
    res.redirect('/consoles2');
  });
  

  
// GET Method For PostMan
router.get('/', async (req, res) => {
  try {
    const consoles = await Console.find();
    res.json(consoles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve consoles' });
  }
});


// PUT Method
router.post('/update', async (req, res) => {
    try {
      const { id, name, category, price, description, imageURL } = req.body; // Include the imageURL field
      const updatedConsole = await Console.findByIdAndUpdate(
        id,
        { name, category, price, description, imageURL }, // Add imageURL to the update fields
        { new: true }
      );
      if (!updatedConsole) {
        return res.status(404).json({ error: 'Console not found' });
      }
      console.log('In Updating Function');
      res.redirect('/consoles2');
    } catch (error) {
      res.status(500).json({ error: 'Failed to update console' });
    }
  });
module.exports = router;
