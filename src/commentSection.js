const express = require('express');
const bodyParser = require('body-parser');
const con = require('./connection');
const app = express();

app.use(bodyParser.json());

// API для зберігання коментарів
app.post('/api/comments', (req, res) => {
  const { filmId, userId, comment } = req.body;

  const insertCommentQuery = 'INSERT INTO comments (FilmId, UserId, Сomment) VALUES (?, ?, ?)';
  con.query(insertCommentQuery, [filmId, userId, comment], (err, result) => {
    if (err) {
      console.error('Error inserting comment:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Comment inserted successfully');
    res.status(201).json({ success: true });
  });
});

// API для отримання коментарів за filmId
app.get('/api/comments/:filmId', (req, res) => {
  const { filmId } = req.params;

  const getCommentsQuery = 'SELECT * FROM comments WHERE FilmId = ?';
  con.query(getCommentsQuery, [filmId], (err, result) => {
    if (err) {
      console.error('Error getting comments:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json(result);
  });
});

module.exports = app;