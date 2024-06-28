const express = require('express');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/welcome', authMiddleware, (_, res) => {
  const dataPath = path.join(__dirname, '../data/demoProtectedResponse.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

/**
 * endpoint: /v1/reference/portfolios-and-groups
 **/

router.get('/reference/portfolios-and-groups', authMiddleware, (_, res) => {
  const dataPath = path.join(__dirname, '../data/portfolioResponse.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

module.exports = router;
