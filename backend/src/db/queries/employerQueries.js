const connection = require('../connection');

function selectAllEmployers(callback) {
    connection.query('SELECT * FROM employers', (err, res) => {
        if (err) {
            console.error('Error fetching employers: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
}

function selectEmployerByID(employerId, callback) {
    connection.query('SELECT * FROM employers WHERE employer_id = ?', employerId, (err, res) => {
        if (err) {
            console.error('Error fetching employer with ID ', employerId, ': ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
}

function createEmployer(employerData, callback) {
    connection.query('INSERT INTO employers SET ?', employerData, (err, res) => {
        if (err) {
            console.error('Error inserting employer: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
}

function updateEmployer(employerData, employerId, callback) {
    connection.query('UPDATE employers SET ? WHERE employer_id = ?', [employerData, employerId], (err, res) => {
        if (err) {
            console.error('Error updating employer: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
}

function deleteEmployer(employerId, callback) {
    connection.query('DELETE FROM notifications where employer_id = ?', employerId, (err, res) => {
        if (err) {
            console.error('Error deleting notifications: ', err);
            return callback(err, null);
        }
    })

    connection.query('DELETE FROM authentication WHERE employer_id = ?', employerId, (err, res) => {
        if (err) {
            console.error('Error deleting authentication: ', err);
            return callback(err, null);
        }
    })

    connection.query('DELETE FROM employers WHERE employer_id = ?', employerId, (err, res) => {
        if (err) {
            console.error('Error deleting employer: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
}

module.exports = {
    selectAllEmployers,
    selectEmployerByID,
    createEmployer,
    updateEmployer,
    deleteEmployer,
}