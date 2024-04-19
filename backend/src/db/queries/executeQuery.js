const connection = require('../connection');

function executeQuery(query, params, callback) {
    connection.query(query, params, (err, res) => {
        if (err) {
            console.error('Database Error: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}