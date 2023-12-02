const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const register = require('./register'); 
const login = require('./login'); 
const userInfo = require('./users.controller'); 
const addFilm = require('./addFilm'); 
const filmInfo = require('./filmInfo'); 
const Todo = require('./To-do'); 
const search = require('./search'); 
const commentSection = require('./commentSection'); 

app.use(cors());
app.use(express.static(path.join(__dirname, '../../reviews_frontend/client', 'build')));

app.use(register);
app.use(login);
app.use(userInfo);
app.use(addFilm);
app.use(filmInfo);
app.use(Todo);
app.use(search);
app.use(commentSection);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, '../../reviews_frontend/client/build', "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});