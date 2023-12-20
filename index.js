require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database');
const authRouter = require('./auth/register');
const threadsRouter = require('./threads');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());  // Middleware to parse JSON bodies |
app.use(cors());
app.use('/auth', authRouter);
app.use('/threads', threadsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.get('/', (req, res) => {
  res.send('Hello World2!');
  console.log('Hi!');
});


// // GET endpoint to fetch all users
// app.get('/users', (req, res) => {
//   db.query('SELECT * FROM Users', (err, results) => {
//     if (err) {
//       res.status(500).send('Error retrieving data from database');
//     } else {
//       res.json(results);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


