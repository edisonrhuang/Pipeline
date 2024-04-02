const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'pipeline_database',
    user: 'test',
    password: 'test'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Sucessfully connected to the Pipeline database.');
});

module.exports = connection;