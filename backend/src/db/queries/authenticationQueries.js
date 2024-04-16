const connection = require('../connection');

/**
 * Retrieves user information from the database based on the provided email address.
 * @param {*} authEmail The email address of the user whose information is to be 
 * retrieved.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getUserInfo(email, callback) {
    connection.query('SELECT * FROM users WHERE email = ?', email, (err, res) => {
        if (err) {
            console.error('Error fetching user with email ', emailmail, ': ', err);
            return callback(err, null);
        }

        const userType = res.uers_type;
        const userId = res.user_id;

        if (userType == 'Candidate') {
            connection.query('SELECT * FROM candidate WHERE candidate_id = ?', userId, (err, res) => {
                if (err) {
                    console.error('Error fetching candidate with id ', userId, ': ', err);
                    return callback(err, null);
                }

                return callback(null, res);
            })
        }

        else if (userType == 'Employer') {
            connection.query('SELECT * FROM employer WHERE employer_id = ?', userId, (err, res) => {
                if (err) {
                    console.error('Error fetching employer with id ', userId, ': ', err);
                    return callback(err, null);
                }

                return callback(null, res);
            });
        }

         else {
            return console.error('Error: Could not find user with email ', authEmail, ' in the database.');
         }
    });
}

module.exports = {
    getUserInfo,
}