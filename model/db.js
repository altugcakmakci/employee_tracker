const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'emp_mgm'
    },
    console.log(`Connected to the movie_db database.`)
  );

module.exports = {connection};