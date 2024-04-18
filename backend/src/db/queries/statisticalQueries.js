const connection = require('../config/connection');

/**
 * Retrieves the gender distribution of candidates from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getGenderDistribution(callback) {
    connection.query('SELECT gender, COUNT(*) AS count FROM candidate GROUP BY gender;', (err, res) => {
        if (err) {
            console.error('Error fetching gender distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
}

/**
 * Retrieves the ethnic distribution of candidates from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getEthnicDistribution(callback) {
    connection.query('SELECT ethnicity, COUNT(*) AS count FROM candidate GROUP BY ethnicity;', (err, res) => {
        if (err) {
            console.error('Error fetching ethnic distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Retrieves the distribution of candidate ages based on their date of birth from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getDateOfBirthDistribution(callback) {
    connection.query('SELECT YEAR(CURDATE()) - YEAR(date_of_birth) - (RIGHT(CURDATE(), 5) < RIGHT(date_of_birth, 5)) AS age, COUNT(*) AS count FROM candidate GROUP BY age;', (err, res) => {
        if (err) {
            console.error('Error fetching date of birth distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Retrieves the distribution of candidate skills from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getSkillDistribution(callback) {
    connection.query('SELECT skill_name, COUNT(*) AS count FROM candidate_skill cs JOIN skill s ON cs.skill_id = s.skill_id GROUP BY skill_name;', (err, res) => {
        if (err) {
            console.error('Error fetching skill distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Retrieves the distribution of employers from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getCompanyDistribution(callback) {
    connection.query('SELECT company_name, COUNT(*) AS count FROM employer GROUP BY company_name;', (err, res) => {
        if (err) {
            console.error('Error fetching company distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Retrieves the distribution of user types (candidate or employer) from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getUserTypeDistribution(callback) {
    connection.query('SELECT user_type, COUNT(*) AS count FROM authentication GROUP BY user_type;', (err, res) => {
        if (err) {
            console.error('Error fetching user type distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Retrieves the total number of connections from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getConnectionDistribution(callback) {
    connection.query('SELECT COUNT(*) AS count FROM connection;', (err, res) => {
        if (err) {
            console.error('Error fetching connection distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Retrieves the total counts of candidates, skills, employers, and connections from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getTotalDistribution(callback) {
    connection.query('SELECT (SELECT COUNT(*) FROM candidate) AS total_candidates, (SELECT COUNT(*) FROM skill) AS total_skills, (SELECT COUNT(*) FROM employer) AS total_employers, (SELECT COUNT(*) FROM connection) AS total_connections;', (err, res) => {
        if (err) {
            console.error('Error fetching total distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Retrieves the yearly growth of candidate registrations from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getYearlyGrowth(callback) {
    connection.query('SELECT YEAR(account_created) AS year, COUNT(*) AS registrations FROM candidate GROUP BY YEAR(account_created) ORDER BY year;', (err, res) => {
        if (err) {
            console.error('Error fetching yearly growth: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Retrieves the gender percentage distribution of candidates from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getGenderPercentage(callback) {
    connection.query('SELECT gender, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM candidate) AS percentage FROM candidate GROUP BY gender;', (err, res) => {
        if (err) {
            console.error('Error fetching gender percentage: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Retrieves the ethnic percentage distribution of candidates from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getEthnicPercentage(callback) {
    connection.query('SELECT ethnicity, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM candidate) AS percentage FROM candidate GROUP BY ethnicity;', (err, res) => {
        if (err) {
            console.error('Error fetching ethnic percentage: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Retrieves the user type percentage distribution (candidate or employer) from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getUserPercentage(callback) {
    connection.query('SELECT user_type, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM authentication) AS percentage FROM authentication GROUP BY user_type;', (err, res) => {
        if (err) {
            console.error('Error fetching user percentage: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Retrieves the completion percentage of candidate profiles from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getCandidateCompletionPercentage(callback) {
    connection.query(`SELECT 'Completed Profile' AS completion_status, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM authentication WHERE candidate_id IS NOT NULL) AS percentage FROM authentication WHERE candidate_id IS NOT NULL;`, (err, res) => {
        if (err) {
            console.error('Error fetching candidate completion percentage: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
}

/**
 * Retrieves the completion percentage of employer profiles from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getEmployerCompletionPercentage(callback) {
    connection.query(`SELECT 'Completed Profile' AS profile_status, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM authentication WHERE employer_id IS NOT NULL) AS percentage FROM authentication WHERE employer_id IS NOT NULL;`, (err, res) => {
        if (err) {
            console.error('Error fetching employer completion percentage: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
}


module.exports = {
    getGenderDistribution,
    getEthnicDistribution,
    getDateOfBirthDistribution,
    getSkillDistribution,
    getCompanyDistribution,
    getUserTypeDistribution,
    getConnectionDistribution,
    getTotalDistribution,
    getYearlyGrowth,
    getGenderPercentage,
    getEthnicPercentage,
    getUserPercentage,
    getCandidateCompletionPercentage,
    getEmployerCompletionPercentage
}