const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Sucessfully connected to the Pipeline database.');
});

module.exports = connection;