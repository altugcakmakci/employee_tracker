const inquirer = require('inquirer');
const {readDeptAll, insertDepartment} = require("./model/dept");
const {readRoleAll, insertRole} = require("./model/role");
const {readEmployeeAll, insertEmployee, updateEmployeeRole} = require("./model/employee");

var questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Quit'],
        name: 'userrequest',
    },
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'departmentname',
        when(answers) {
            return answers.userrequest === "Add a department"
        }
    },
    {
        type: 'input',
        message: 'What is the role?',
        name: 'rolename',
        when(answers) {
            return answers.userrequest === "Add a role"
        }
    },
    {
        type: 'input',
        message: 'How much is the salary?',
        name: 'salary',
        when(answers) {
            return answers.userrequest === "Add a role"
        }
    },
    {
        type: 'list',
        message: 'What is the department for the role?',
        name: 'roledepartment',
        choices: [],
        when(answers) {
            return answers.userrequest === "Add a role"
        }
    },
    {
        type: 'input',
        message: `What is the employee's first name?`,
        name: 'firstname',
        when(answers) {
            return answers.userrequest === "Add an employee"
        }
    },
    {
        type: 'input',
        message: `What is the employee's last name?`,
        name: 'lastname',
        when(answers) {
            return answers.userrequest === "Add an employee"
        }
    },
    {
        type: 'list',
        message: `What is the employee's role?`,
        name: 'emprole',
        choices: [],
        when(answers) {
            return answers.userrequest === "Add an employee"
        }
    },
    {
        type: 'list',
        message: `Who is the employee's manager?`,
        name: 'managerid',
        choices: [],
        when(answers) {
            return answers.userrequest === "Add an employee"
        }
    },  
    {
        type: 'list',
        message: `Which employee's role do you want to update?`,
        name: 'updempid',
        choices: [],
        when(answers) {
            return answers.userrequest === "Update an employee role"
        }
    }, 
    {
        type: 'list',
        message: `What is the employee's new role?`,
        name: 'emprolenew',
        choices: [],
        when(answers) {
            return answers.userrequest === "Update an employee role"
        }
    },
];

function populateDepartments(result){
    questions[4].choices = [];
    result.forEach(element => {
        questions[4].choices.push(element.id+'-'+element.name);
    });
}

function populateRoles(result){
    questions[7].choices = [];
    questions[10].choices = [];
    result.forEach(element => {
        questions[7].choices.push(element.id+'-'+element.title);
        questions[10].choices.push(element.id+'-'+element.title);
    });
}

function populateEmployees(result){
    questions[8].choices = ["Does not have a manager."];
    questions[9].choices = [];
    result.forEach(element => {
        questions[8].choices.push(element.id+'-'+element.first_name+" "+element.last_name);
        questions[9].choices.push(element.id+'-'+element.first_name+" "+element.last_name);
    });
}

function showDepartments(result){
    console.log(" ");
    console.table(result);
    populateDepartments(result);
}

function showRoles(result){
    console.log(" ");
    console.table(result);
    populateRoles(result);
}

function showEmployees(result){
    console.log(" ");
    console.table(result);
    populateEmployees(result);
}

function processRequest(userreq){
    console.log(userreq);
    if (userreq.userrequest==='View all departments'){
        readDeptAll(showDepartments);
    } else if (userreq.userrequest==='View all roles'){
        readRoleAll(showRoles);
    } else if (userreq.userrequest==='View all employees'){
        readEmployeeAll(showEmployees);
    } else if (userreq.userrequest==='Add a department'){
        insertDepartment(userreq.departmentname,function (){readDeptAll(showDepartments);});
    } else if (userreq.userrequest==='Add a role'){
        let dept_id = Number(userreq.roledepartment.split("-")[0]);
        insertRole({title:userreq.rolename,salary:userreq.salary,department_id:dept_id},function (){readRoleAll(showRoles);});
    } else if (userreq.userrequest==='Add an employee'){
        let role_id = Number(userreq.emprole.split("-")[0]);
        let manager_id = -1;
        console.log(userreq.managerid);
        if (userreq.managerid !='Does not have a manager.'){
            manager_id = Number(userreq.managerid.split("-")[0]);
        }
        insertEmployee({firstName:userreq.firstname,lastName:userreq.lastname,roleId:role_id,managerId:manager_id},function (){readEmployeeAll(showEmployees);});
    } else if (userreq.userrequest==='Update an employee role'){
        let role_id = Number(userreq.emprolenew.split("-")[0]);
        let emp_id = Number(userreq.updempid.split("-")[0]);
        updateEmployeeRole(emp_id,role_id,function (){readEmployeeAll(showEmployees);});
    }
}

function getAnswers() {
    return inquirer.prompt(questions).then((answers) => {
        if (answers.userrequest === "Quit") {
            return answers;
        } else {
            console.log(JSON.stringify(answers, null, 2))
            processRequest(answers);
            return getAnswers();
        }
    });
}

function initialize(){
    readDeptAll(populateDepartments);
    readRoleAll(populateRoles);
    readEmployeeAll(populateEmployees);
}

function main() {
    initialize();
    getAnswers()
        .then()
        .catch((error) => { });
}

main();