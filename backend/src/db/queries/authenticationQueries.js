const connection = require('../connection');

function getUserInfo(authEmail, callback) {
    connection.query('SELECT * FROM users WHERE email = ?', authEmail, (err, res) => {
        if (err) {
            console.error('Error fetching user with email ', authEmail, ': ', err);
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