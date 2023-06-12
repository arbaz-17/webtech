const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const User = require('../models/user');


router.get('/', async (req, res) => {
  try {
    console.log("Inside userdata.js file");
    const users = await User.find();
    res.render('users', { users,role: req.user ,layout: 'layout0'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve games' });
  }
});

// DELETE Method
router.post('/delete', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.body.id);
      if (!deletedUser) {
        console.log('User not found.');
      } else {
        console.log('User deleted successfully.');
      }
      res.redirect('/userdata');
    } catch (err) {
      console.error(err);

    }
  });

module.exports = router;


