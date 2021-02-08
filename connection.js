const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'chat_app'
  });


  db.connect(function(err) {
    if (err) throw err;
    console.log('db connected!');
  });

  module.exports = db;
