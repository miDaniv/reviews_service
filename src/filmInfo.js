const express = require('express');
const cors = require('cors');
const con = require('./connection'); // Ваш файл з'єднання із базою даних
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/film-info/:id', (req, res) => {
  const movieId = req.params.id;
  const sql = 'SELECT * FROM filmdata WHERE Id = ?';
  con.query(sql, [movieId], (err, result) => {
    if (err) {
      console.error('Error fetching movie data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    }
  });
});

module.exports = app;