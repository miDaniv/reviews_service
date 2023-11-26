const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const con = require('./connection')
const path = require("path");
        
  app.use(bodyParser.json());
  app.post('/register', (req, res) => {
    const { username, email, password, login } = req.body;
    if (!username || !email || !password || !login) {
      return res.status(400).json({ message: 'Будь ласка, заповніть всі поля форми.' });
    }
    const query = 'INSERT INTO userdata (Name, Login, Password, Email) VALUES (?, ?, ?, ?)';
    con.query(query, [username, login, password, email], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
      } else {
        console.log('Отримані дані:', { username, email, password, login });
        return res.status(201).json({ message: 'Користувач успішно зареєстрований' });
      }
    });
  });

  app.post('/check-username', (req, res) => {
    const { username } = req.body;
    const query = 'SELECT * FROM userdata WHERE Name = ?';

    con.query(query, [username], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
      }

      const isUnique = result.length === 0;
      return res.json({ isUnique });
    });
  });
