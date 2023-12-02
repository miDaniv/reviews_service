const express = require('express');
const cors = require('cors');
const con = require('./connection');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/user', (req, res) => {
  // Отримати токен з заголовків запиту
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    // Повернути помилку, якщо токен відсутній
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Розшифрувати токен
    const decodedToken = jwt.verify(token, 'your_secret_key');

    // Отримати дані користувача за id
    const userId = decodedToken.userId;
    const query = 'SELECT * FROM userdata WHERE id = ?';
    con.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error executing database query:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else if (results.length > 0) {
        const user = results[0];
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    });
  } catch (error) {
    // Повернути помилку, якщо токен недійсний
    console.error('Error decoding token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = app;
