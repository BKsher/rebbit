const express = require('express');
const router = express.Router();
const db = require('./database'); 

// Endpoint to add a comment to a post
router.post('/:postId', (req, res) => {
  const { postId } = req.params;
  const { userId, content } = req.body;

  if (!content || !userId) {
    return res.status(400).send('Content and user ID are required');
  }

  const query = 'INSERT INTO Comments (post_id, user_id, content, comment_date) VALUES (?, ?, ?, NOW())';
  db.query(query, [postId, userId, content], (err, result) => {
    if (err) {
      console.error('Error adding comment:', err);
      return res.status(500).send('Server error during comment creation');
    }
    res.status(201).send(`Comment added successfully with ID: ${result.insertId}`);
  });
});

// Endpoint to get all comments of a post
router.get('/:postId', (req, res) => {
    const { postId } = req.params;
  
    const query = 'SELECT * FROM Comments WHERE post_id = ?';
    db.query(query, [postId], (err, results) => {
      if (err) {
        console.error('Error fetching comments:', err);
        return res.status(500).send('Server error while retrieving comments');
      }
      res.json(results);
    });
  });

module.exports = router;
