const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const users = require('../data/users'); // Simulated user data

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) {
    return res.status(400).send('Username or password is incorrect');
  }

  const token = jwt.sign(
    { id: user.id, user: user.username },
    process.env.SECRET_KEY,
    {
      expiresIn: '1h',
    },
  );
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  res.send('Logged in successfully');
});

router.post('/logout', (req, res) => {
  res.clearCookie('access_token');
  res.send('Logged out successfully');
});

module.exports = router;
