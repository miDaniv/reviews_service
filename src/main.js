var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const port = 8080;

app.get('/', (req, res) => {
  res.send('Привіт, світ!');
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});

