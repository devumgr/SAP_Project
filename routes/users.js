const express = require('express');
const db  = require('../dbconfig');

const router = express.Ro

router.get('/login', async (req, res) => {
  res.render('login', { title: 'Login' });
});

//handle login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).send('Internal server error.');
    }

    if (!user || user.password !== password) {
      return res.status(400).send('Invalid email or password.');
    }

    res.send(`Welcome, ${user.name}!`);
  });
});

module.exports = db;
