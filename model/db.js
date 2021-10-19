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

// function readDeptAll (callback) {
//     connection.query('SELECT * FROM DEPARTMENT', (err,rows) => {
//         if(err) throw err;
      
//         console.log('Data received from Db:');
//         console.log(rows);
//         return callback(rows)
//       });
//     }

module.exports = {connection};