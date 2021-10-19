const { connection } = require('./db');

function readEmployeeAll(callback) {
    connection.query('SELECT * FROM EMPLOYEE', (err, rows) => {
        if (err) throw err;

        return callback(rows)
    });
}

function insertEmployee(employee, callback) {
    console.log(employee);
    if (employee.managerId === -1) {
        connection.query('INSERT INTO EMPLOYEE (first_name,last_name,role_id) VALUES (?,?,?)', [employee.firstName, employee.lastName, employee.roleId], (err, res) => {
            if (err) {
                console.log(err);
                throw err;
            }
            callback("Employee added.");
        });
    } else {
        connection.query('INSERT INTO EMPLOYEE (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)', [employee.firstName, employee.lastName, employee.roleId, employee.managerId], (err, res) => {
            if (err) {
                console.log(err);
                throw err;
            }
            callback("Employee added.");
        });
    }

}

function deleteEmployee(id, callback) {
    connection.query('DELETE FROM EMPLOYEE WHERE ID = ?', [id], (err, res) => {
        if (err) {
            console.log(err);
            throw err;
        }
        callback("Employee deleted.");
    });
}

function updateEmployeeRole(id, roleId, callback) {
    connection.query('UPDATE EMPLOYEE SET ROLE_ID = ? WHERE ID = ?', [roleId, id], (err, res) => {
        if (err) {
            console.log(err);
            throw err;
        }
        callback("Employee updated.");
    });
}

module.exports = { readEmployeeAll, insertEmployee, deleteEmployee, updateEmployeeRole };

