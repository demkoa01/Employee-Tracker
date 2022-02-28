require('dotenv').config();

const mysql = require('mysql2');
const inqurier = require('inquirer');
const consoleTable = require('console.table');

// connect to database
var connection = mysql.createConnection(
    {
    host: "localhost",
    // my username
    user: 'root',
    //my PW
    password: 'Mrs.Carlson2023',
    database: 'employee'
    },
    console.log('Connected to the employee database!')
);

// after connnected to db move to user prompts
connection.connect(function(err) {
    if (err) throw err;
    options();
});

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
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + 'employees found.');
        console.table('All Employees:', res);
        options();
    })
};

// viewDepartments()
function viewDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err,res) {
        if (err) throw err;
        console.table('All Departments:', res);
        options();
    })
};

// viewRoles()
function viewRoles() {
    var query = 'SELECT * FROM roles';
    connection.query(query, function(err,res) {
        if (err) throw err;
        console.table('All Roles:', res);
        options();
    })
};

// addEmployee()
function addEmployee() {
    inqurier
        .prompt([
        {
            type: "input",
            message: "Enter the employee's first name",
            name: "first_name"
        },
        {
            type: "input",
            message: "Enter the employee's last name",
            name: "last_name"
        },
        {
            type: "input",
            message: "Enter the employee's role ID",
            name: "role"
        },
        {
            type: "input",
            message: "Enter the employee's manager ID",
            name: "manager_id"
        }
        ])
        .then(function (res) {
        const firstName = res.first_name;
        const lastName = res.last_name;
        const employRoleID = res.role;
        const employManID = res.manager_id;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employRoleID}", "${employManID}")`;
        connection.query(query, function (err, res) {
            if (err) {
            throw err;
            }
            console.table(res);
            options();
        });
        });
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
            connection.query('INSERT INTO department SET ?',
            {
                name: answer.newDepartment
            });
            var query = 'SELECT * FROM department';
            connection.query(query, function(err,res) {
                if (err) throw err;
                console.log('Your deparmtne has been added!');
                console.table('All Departments:', res);
                options();
            })
        })
};

// addRole()
function addRole() {
    connection.query('SELECT * FROM department', function(err,res) {
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

                connection.query(
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
function updateEmployee() {
    inqurier
        .prompt([
        {
            type: "input",
            message: "Enter the employee's ID you want to be updated.",
            name: "updateEmployee"
        },
        {
            type: "input",
            message: "Enter the new role ID for that employee.",
            name: "newRole"
        }
        ])
        .then(function (res) {
            const updateEmployee = res.updateEmployee;
            const newRole = res.newRole;
            const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmployee}"`;
            connection.query(queryUpdate, function (err, res) {
            if (err) {
                throw err;
            }
            console.table(res);
            options();
            })
        });
};

// deleteEmployee()
function deleteEmployee() {
    const employeeSQL = 'SELECT * FROM employee';

    connection.query(employeeSQL, (err, data) => {
        if (err) throw err;

        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name +" " + last_name, value: id }));

        inqurier
        .prompt([
            {
                tpye: 'list',
                name: 'name',
                message: 'Which employee would you like to remove? Please provide their ID #.',
                choices: employees
            }
        ]).then(empChoice => {
            const employee = empChoice.name;
            const sql = 'DELETE FROM employee WHERE id = ? ';

            connection.query(sql, employee, (err, res) => {
                if (err) throw err;
                console.log("Employee successfully removed.");
                viewEmployees();
            });
        });
    });
};

// exitApp()
function exitApp() {
    connection.end();
    console.log('You have left the application.');
};
