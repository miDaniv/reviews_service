const express = require('express');
const router = express.Router();
const con = require('./connection');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.use(bodyParser.json());
router.post('/login', async (req, res) => {
  const { login, password } = req.body;

  console.log('Введений логін і пароль:', { login, password });
  if (!login || !password) {
    return res.status(400).json({ message: 'Будь ласка, введіть логін і пароль.' });
  }

  const query = 'SELECT * FROM userdata WHERE LOWER(Login) = LOWER(?)';
  con.query(query, [login], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Помилка сервера' });
    }

    if (result.length === 1) {
      const hashedPasswordFromDB = result[0].Password;

      try {
        const isPasswordMatch = await bcrypt.compare(password, hashedPasswordFromDB);

        if (isPasswordMatch) {
          const token = jwt.sign({ userId: result[0].Id, username: result[0].Login }, 'your_secret_key');

          return res.status(200).json({ token, message: 'Ви успішно увійшли в акаунт' });
        } else {
          console.error('Помилка авторизації: Невірний пароль');
          return res.status(401).json({ message: 'Невірний логін або пароль' });
        }
      } catch (error) {
        console.error('Помилка порівняння паролів:', error);
        return res.status(500).json({ message: 'Помилка сервера' });
      }
    } else {
      console.error('Помилка авторизації: Користувача не знайдено');
      return res.status(401).json({ message: 'Невірний логін або пароль' });
    }
  });
});

module.exports = router;
