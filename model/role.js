const { connection } = require('./db');

function readRoleAll(callback) {
    connection.query('SELECT * FROM ROLE', (err, rows) => {
        if (err) throw err;

        callback(rows)
    });
}

function insertRole(role, callback) {
    connection.query('INSERT INTO ROLE (title,salary,department_id) VALUES (?,?,?)', [role.title,role.salary,role.department_id], (err, res) => {
        if (err) {
            console.log(err);
            throw err;
        }
        callback("Role added.");
    });
}

function deleteRole(id, callback) {
    connection.query('DELETE FROM ROLE WHERE ID = ?', [id], (err, res) => {
        if (err) {
            console.log(err);
            throw err;
        }
        callback("Role deleted.");
    });
}

function updateRole(id, name, callback) {
    connection.query('UPDATE ROLE SET TITLE = ?, SALARY = ?, DEPARTMENT_ID = ? WHERE ID = ?', [role.title,role.salary,role.department_id, role.id], (err, res) => {
        if (err) {
            console.log(err);
            throw err;
        }
        callback("Role updated.");
    });
}

module.exports = { readRoleAll, insertRole, deleteRole, updateRole };

