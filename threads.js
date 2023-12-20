const express = require('express');
const router = express.Router();
const authenticate = require('./auth/authenticate');
const db = require('./database'); 

// Endpoint to create a new thread
router.post('/', authenticate, (req, res) => {
  const { title, userId } = req.body; 
  if (!title || !userId) {
    return res.status(400).send('Title and user ID are required');
  }

  const query = 'INSERT INTO Threads (title, user_id, creation_date) VALUES (?, ?, NOW())';
  db.query(query, [title, userId], (err, result) => {
    if (err) {
      console.error('Error creating thread:', err);
      return res.status(500).send('Server error during thread creation');
    }
    res.status(201).send(`Thread created successfully with ID: ${result.insertId}`);
  });
});

// Endpoint to get all threads
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Threads';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching threads:', err);
        return res.status(500).send('Server error while retrieving threads');
      }
      res.json(results);
    });
  });

module.exports = router;
