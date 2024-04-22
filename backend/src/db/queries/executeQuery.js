const connection = require('../connection');

function executeQuery(query, params, callback) {
    connection.query(query, params, (err, res) => {
        if (err) {
            console.error('Database error: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

module.exports = executeQuery;