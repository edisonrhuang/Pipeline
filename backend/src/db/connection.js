import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Sucessfully connected to the Pipeline database.');
});

export default connection