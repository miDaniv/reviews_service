const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const login = require('./login')
const path = require('path');
const con = require('./connection')


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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../reviews_frontend/client/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
