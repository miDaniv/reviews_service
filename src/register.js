const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const app = express();
const con = require('./connection');

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { username, email, password, login } = req.body;
  if (!username || !email || !password || !login) {
    return res.status(400).json({ message: 'Будь ласка, заповніть всі поля форми.' });
  }

  try {
    if (password.length < 3 || password.length > 15) {
      return res.status(400).json({ message: 'Пароль повинен бути від 3 до 15 символів.' });
    }

    const emailCheckQuery = 'SELECT * FROM userdata WHERE Email = ?';
    const emailCheckResult = await con.query(emailCheckQuery, [email]);

    if (emailCheckResult.length > 0) {
      return res.status(400).json({ message: 'Цей емейл вже використовується.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = 'INSERT INTO userdata (Name, Login, Password, Email) VALUES (?, ?, ?, ?)';
    await con.query(insertUserQuery, [username, login, hashedPassword, email]);

    console.log('Отримані дані:', { username, email, login });
    return res.status(201).json({ message: 'Користувач успішно зареєстрований' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Помилка сервера' });
  }
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

module.exports = app;