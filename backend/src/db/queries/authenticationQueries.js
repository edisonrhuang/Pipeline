const connection = require('../connection');
const { createCandidate } = require('./candidateQueries');
const { createEmployer } = require('./employerQueries');

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
    connection.query('SELECT * FROM authentication WHERE email = ?', email, (err, res) => {
        if (err) {
            console.error('Error fetching user with email ', email, ': ', err);
            return callback(err, null);
        }

        // Extract user type and user id from the fetched user information
        const userType = res.uers_type;
        const userId = res.user_id;

        // If the user type is "Candidate"
        if (userType == 'Candidate') {
            connection.query('SELECT * FROM candidate WHERE candidate_id = ?', userId, (err, res) => {
                if (err) {
                    console.error('Error fetching candidate with id ', userId, ': ', err);
                    return callback(err, null);
                }
                return callback(null, res);
            })
        }
        // If the user type is "Employer"
        else if (userType == 'Employer') {
            connection.query('SELECT * FROM employer WHERE employer_id = ?', userId, (err, res) => {
                if (err) {
                    console.error('Error fetching employer with id ', userId, ': ', err);
                    return callback(err, null);
                }
                return callback(null, res);
            });
        }
        // If no user was found with the provided email address
        else {
            console.error('Error: Could not find user with email ', email, ' in the database.');
            return callback(null, undefined);
        }
    });
}

/**
 * Creates a new user in the authentication table, along with the corresponding
 * user in the candidate or employer table.
 * 
 * @param {string} email The email address of the user.
 * @param {string} userType The type of user ('Candidate' or 'Employer').
 * @param {object} info Additional information specific to the user type.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function createUser(email, userType, info, callback) {
    connection.query('INSERT INTO authentication (email, user_type) VALUES (?, ?)', [email, userType], (err, res) => {
        if (err) {
            console.error('Error creating user with email ', email, ': ', err);
            return callback(err, null);
        }

        if (userType == 'Candidate') {
            createCandidate(info, (err, res) => {
                if (err) {
                    console.error('Error creating candidate with email ', email, ': ', err);
                    return callback(err, null);
                }
                
                const candidate_id = res.insertId;
                connection.query('UPDATE authentication SET candidate_id = ? WHERE email = ?', [candidate_id, email], (err, res) => {
                    if (err) {
                        console.error('Error updating user_id for candidate with email ', email, ': ', err);
                        return callback(err, null);
                    }
                    return callback(null, res);
                });
            });
        } 
        else if (userType == 'Employer') {
            createEmployer(info, (err, res) => {
                if (err) {
                    console.error('Error creating employer with email ', email, ': ', err);
                    return callback(err, null);
                }
                
                const employer_id = res.insertId;
                connection.query('UPDATE authentication SET employer_id = ? WHERE email = ?', [employer_id, email], (err, res) => {
                    if (err) {
                        console.error('Error updating user_id for employer with email ', email, ': ', err);
                        return callback(err, null);
                    }
                    return callback(null, res);
                });
            });
        }
    });
}

module.exports = {
    getUserInfo,
    createUser,
}