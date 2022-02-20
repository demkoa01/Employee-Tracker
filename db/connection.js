// require mysql
const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // my username
        user: 'root',
        //my PW
        password: 'Mrs.Carlson2023',
        database: 'employee'
    },
    console.log('Connected to the employee database!')
);

module.exports = db;
