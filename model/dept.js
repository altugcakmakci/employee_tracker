const {connection} = require('./db');

function readDeptAll (callback) {
    connection.query('SELECT * FROM DEPARTMENT', (err,rows) => {
        if(err) throw err;
      
        callback(rows)
      });
    }

function insertDepartment(name,callback) {
    connection.query('INSERT INTO DEPARTMENT (name) VALUES (?)', [name], (err, res) => {
      if(err) {
          console.log(err);
          throw err;
      }
      callback("Department added.");
    });
}

function deleteDepartment(id,callback) {
    connection.query('DELETE FROM DEPARTMENT WHERE ID = ?', [id], (err, res) => {
      if(err) {
          console.log(err);
          throw err;
      }
      callback("Department deleted.");
    });
}

function updateDepartment(id,name,callback) {
    connection.query('UPDATE DEPARTMENT SET NAME = ? WHERE ID = ?', [name,id], (err, res) => {
      if(err) {
          console.log(err);
          throw err;
      }
      callback("Department updated.");
    });
}

module.exports = {readDeptAll, insertDepartment, deleteDepartment, updateDepartment};

