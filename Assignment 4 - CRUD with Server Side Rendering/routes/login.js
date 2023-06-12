const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Game = require('../models/Game');
const session = require('express-session');


router.use(require("../middleware/checkSession"));

// POST Method
router.post('/login', async(req, res, next) => {
  const { email, password } = req.body;
  const games = await Game.find();
  User.findOne({ email, password })
    .then((user) => {
      if (!user) {
        return res.send('<script>alert("Invalid email or password"); window.location.href = "/";</script>');
      }
      if (req.body.role !== user.role) {
        return res.send('<script>alert("Invalid role"); window.location.href = "/";</script>');
      }
      req.session.user = user; 
      console.log(req.session.user);

      if (user.role === 'customer') {
        return res.redirect('/landingpage');
      } 
      else if (user.role === 'admin') {
        return res.redirect('/admin');
      }

      return res.send('<script>alert("Invalid role"); window.location.href = "/";</script>');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});


// Post Method : Signup
router.post('/signup', (req, res) => {
  const { fullname, email, password,role } = req.body;

  User.findOne({ email }) 
    .then((existingUser) => {
      if (existingUser) {
        return res.send('<script>alert("User Already Exists"); window.location.href = "/";</script>');
      }
      const user = new User({ fullname, email, password, role});
      return user.save();
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/users', (req, res) => {
  User.find()
    .then((users) => {
      res.render('users', { users });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});


// GET Method
router.get('/users', (req, res) => {
  User.find()
    .then((users) => {
      res.json(users); 
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});


//Logout Method
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Internal Server Error');
    }
    console.log("The User Has Been Loged Out.")
    res.redirect('/');
  });
});
module.exports = router;
