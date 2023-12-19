const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database'); // Adjust the path as per your project structure

// User login endpoint
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).send('Please provide email and password');
    }

    // Check if user exists
    db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return res.status(500).send('Server error during user lookup');
      }

      if (results.length === 0) {
        return res.status(401).send('Invalid credentials');
      }

      const user = results[0];

      // Compare provided password with stored hash
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (isMatch) {
        // Passwords match
        // Here you would create a session or token
        res.send('Login successful');
      } else {
        // Passwords do not match
        res.status(401).send('Invalid credentials');
      }
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
