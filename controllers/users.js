const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Planet = require('../models/planet.js');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users/index.ejs', { users });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const planets = await Planet.find({ owner: userId });

    if (!user) {
      return res.redirect('/users');
    }
    res.render('users/show.ejs', { user, planets });
  } catch (error) {
    console.error(error);
    res.redirect('/users');
  }
});

module.exports = router;