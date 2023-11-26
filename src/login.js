const express = require('express')
const router = express();
const path = require('path');
const con = require('./connection')
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.post('/login', (req, res) => {
  const { login, password } = req.body;

  console.log('Введений логін і пароль:', { login, password });
  if (!login || !password) {
    return res.status(400).json({ message: 'Будь ласка, введіть логін і пароль.' });
  }
  const query = 'SELECT * FROM userdata WHERE Login = ? AND Password = ?';
  con.query(query, [login, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Помилка сервера' });
    }
    else if (result.length === 1) {
      return res.status(200).json({ message: 'Ви успішно увійшли в акаунт' });
    } else {
      return res.status(401).json({ message: 'Невірний логін або пароль' });
    }
  });
});

// router.post('/', (req, res) => {
//     const { username, login, password } = req.body;
  
//     con.query('INSERT INTO userdata (Name, Login, Password) VALUES ( ?, ?, ?)', [username, login, password], (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Помилка сервера');
//       } else {
//         res.status(201).send('Користувача створено успішно');
//       }
//     });
//   });

// router.delete("/user/:userId", (req, res) => { //delete
//     const userId = req.params.userId;
  
//     con.query('DELETE FROM userdata WHERE id = ?', [userId], (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Помилка сервера');
//       } else {
//         res.status(201).send('Користувача видалено успішно');
//       }
//     });
//   });


// app.get("/user/:userId", (req, res) => { // get user
//   res.send('POST request to the homepage')
// })

// app.put('/user/:userId', (req, res) => { // update existing user
//   res.send('POST request to the homepage')
// })


module.exports = router;
