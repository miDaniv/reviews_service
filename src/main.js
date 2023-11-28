const express = require('express');
const app = express();
const path = require('path');
const con = require('./connection');
const register = require('./register'); 
const login = require('./login'); 
const userPage = require('./userPage'); 
const addFilm = require('./addFilm'); 
const filmInfo = require('./filmInfo');
const cors = require('cors'); 

app.use(cors());
app.use(express.static(path.join(__dirname, '../../reviews_frontend/client', 'build')));
app.get('/', (req, res) => {
  console.log('hello');
  res.sendFile(path.join(__dirname, '../../reviews_frontend/client/build', 'index.html'));
});

app.get('/contact', (req, res) => {
  console.log('Звернення до сторінки /example');
  res.send('Ви на сторінці /example');
});

app.use(express.static(path.join(__dirname, '../../reviews_frontend/client/build')));

app.use(register);
app.use(login);
app.use(userPage);
app.use(addFilm);
app.use(filmInfo);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../reviews_frontend/client/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
