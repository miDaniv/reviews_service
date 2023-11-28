const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const con = require('./connection');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }

  const query = 'SELECT * FROM userdata WHERE id = ?';

  con.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Помилка виконання запиту до бази даних:', err);
      res.status(500).json({ message: 'Помилка сервера' });
    } else if (results.length > 0) {
      const user = results[0];
      res.json(user);
    } else {
      res.status(404).json({ message: 'Користувача не знайдено' });
    }
  });
});

module.exports = app;
