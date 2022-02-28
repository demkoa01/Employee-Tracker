require('dotenv').config();

const mysql = require('mysql2');
const inqurier = require('inquirer');
const consoleTable = require('console.table');
const { connect } = require('./db/connection');
const db = require('./db/connection');

// connect to database
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    options();
})


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
                    exitApp();
                    break;
                default:
                    break;
            }
        })
};

// viewEmployees()
function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connect.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + 'employees found.');
        console.table('All Employees:', res);
        options();
    })
};

// viewDepartments()
function viewDepartments() {
    var query = 'SELECT * FROM department';
    connect.query(query, function(err,res) {
        if (err) throw err;
        console.table('All Departments:', res);
        options();
    })
};

// viewRoles()
function viewRoles() {
    var query = 'SELECT * FROM roles';
    connect.query(query, function(err,res) {
        if (err) throw err;
        console.table('All Roles:', res);
        options();
    })
};

// addEmployee()
function addEmployee() {
   connect.query('SELECT * FROM role', function(err, res) {
       if (err) throw err;
       inqurier
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: "What is the employee's first name?"
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the employee's last name?"
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function() {
                        var roleArr = [];
                        for (let i=0; i<res.length; i++) {
                            roleArr.push(res[i].title);
                        }
                        return roleArr;
                    },
                    message: "What is the employee's role?"
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "What is the employee's manager ID?"
                }
            ]).then(function(answer) {
                let role_id;
                for (let i=0; i<res.length; i++) {
                    if (res[i].title == answer.role) {
                        role_id = res[i].id;
                        console.log(role_id);
                    }
                }
                connect.query('INSET INTO employee SET ?', 
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: role_id,
                        manager_id: answer.manager_id,
                    },
                function (err) {
                    if (err) throw err;
                    console.log('Your employee has been added!');
                    options();
                })
            })
   }) 
};

// addDepartment()
function addDepartment() {
    inqurier
        .prompt([
            {
                name: 'newDepartment',
                text: 'input',
                message: 'Which department would you like to add?'
            }
        ]).then(function (answer) {
            connect.query('INSERT INTO department SET ?',
            {
                name: answer.newDepartment
            });
            var query = 'SELECT * FROM department';
            connect.query(query, function(err,res) {
                if (err) throw err;
                console.log('Your deparmtne has been added!');
                console.table('All Departments:', res);
                options();
            })
        })
};

// addRole()
function addRole() {
    connect.query('SELECT * FROM department', function(err,res) {
        if (err) throw err;

        inqurier
            .prompt([
                {
                    name: 'new_role',
                    type: 'input',
                    message: 'What new role would you like to add?'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary for this role? Please enter a number.'
                },
                {
                    name: 'department',
                    type: 'list',
                    choices: function() {
                        var deptArr = [];
                        for (let i=0; i<res.length; i++) {
                            deptArr.push(res[i].name);
                        }
                        return deptArr;
                    },
                }
            ]).then(function(answer) {
                let department_id;
                for (let i=0; i<res.length; i++) {
                    if(res[i].name == answer.department) {
                        department_id = res[i].id;
                    }
                }

                connect.query(
                    'INSERT INTO roles SET ?',
                    {
                        title: answer.new_role,
                        salary: answer.salary,
                        department_id: department_id
                    },
                    function (err, res) {
                        if(err) throw err;
                        console.log('The new role has been added!');
                        console.table('All Roles:', res);
                        options();
                    })
            })
    })
};

// updateEmployee()
function updateEmployee() {};

// deleteEmployee()
function deleteEmployee() {
    let employeeArr = [];

};

// exitApp()
function exitApp() {};
