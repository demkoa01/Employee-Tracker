require('dotenv').config();

const mysql = require('mysql2');
const inqurier = require('inquirer');
const consoleTable = require('console.table');

// prompt user with different options
function options() {
    inqurier
        .prompt({
            name: 'action',
            type: 'list',
            message: 'Welcome to the employee database, what would you like to do?',
            choices: [
                'View all Employees',
                'View all Departments',
                'View all Roles',
                'Add an Employee',
                'Add a Department',
                'Add a Role',
                'Update an Employee Role',
                'Delete an Employee',
                'EXIT the Database'
            ]
        }).then(function(answer) {
            switch(answer.action) {
                case 'View all Employees':
                    viewEmployees();
                    break;
                case 'View all Departments':
                    viewDepartments();
                    break;
                case 'View all Roles':
                    viewRoles();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Update an Employee Role':
                    updateEmployee();
                    break;
                case 'Delete an Employee':
                    deleteEmployee();
                    break;
                case 'EXIT the Database':
                    exit();
                    break;
                default:
                    break;
            }
        })
};

// viewEmployees()
function viewEmployees() {};

// viewDepartments()
function viewDepartments() {};

// viewRoles()
function viewRoles() {};

// addEmployee()
function addEmployee() {};

// addDepartment()
function addDepartment() {};

// addRole()
function addRole() {};

// updateEmployee()
function updateEmployee() {};

// deleteEmployee()
function deleteEmployee() {};

// exit()
function exit() {};

