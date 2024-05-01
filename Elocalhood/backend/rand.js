// signup.js
const express = require('express');
const router = express.Router();

// Define routes for signup
router.get('/', (req, res) => {
  res.send('This is the signup page');
});

module.exports = router;
