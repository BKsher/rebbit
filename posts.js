const express = require('express');
const router = express.Router();
const db = require('./database');

// Endpoint to add a post to a thread
router.post('/:threadId', (req, res) => {
  const { threadId } = req.params;
  const { userId, content } = req.body;

  if (!content || !userId) {
    return res.status(400).send('Content and user ID are required');
  }

  const query = 'INSERT INTO Posts (thread_id, user_id, content, post_date) VALUES (?, ?, ?, NOW())';
  db.query(query, [threadId, userId, content], (err, result) => {
    if (err) {
      console.error('Error adding post:', err);
      return res.status(500).send('Server error during post creation');
    }
    res.status(201).send(`Post added successfully with ID: ${result.insertId}`);
  });
});

// Endpoint to get all posts of a thread
router.get('/:threadId', (req, res) => {
    const { threadId } = req.params;
  
    const query = 'SELECT * FROM Posts WHERE thread_id = ?';
    db.query(query, [threadId], (err, results) => {
      if (err) {
        console.error('Error fetching posts:', err);
        return res.status(500).send('Server error while retrieving posts');
      }
      res.json(results);
    });
  });

module.exports = router;
