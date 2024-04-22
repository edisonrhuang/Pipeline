const connection = require('../config/connection');
const executeQuery = require('./executeQuery');

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
    return executeQuery('SELECT gender, COUNT(*) AS count FROM candidate GROUP BY gender;', null, callback);
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
    return executeQuery('SELECT ethnicity, COUNT(*) AS count FROM candidate GROUP BY ethnicity;', null, callback);
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
    return executeQuery('SELECT YEAR(CURDATE()) - YEAR(date_of_birth) - (RIGHT(CURDATE(), 5) < RIGHT(date_of_birth, 5)) AS age, COUNT(*) AS count FROM candidate GROUP BY age;', null, callback);
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
    return executeQuery('SELECT skill_name, COUNT(*) AS count FROM candidate_skill cs JOIN skill s ON cs.skill_id = s.skill_id GROUP BY skill_name;', null, callback);
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
    return executeQuery('SELECT company_name, COUNT(*) AS count FROM employer GROUP BY company_name;', null, callback);
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
    return executeQuery('SELECT user_type, COUNT(*) AS count FROM authentication GROUP BY user_type;', null, callback);
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
    return executeQuery('SELECT COUNT(*) AS count FROM connection;', null, callback);
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
    return executeQuery('SELECT (SELECT COUNT(*) FROM candidate) AS total_candidates, (SELECT COUNT(*) FROM skill) AS total_skills, (SELECT COUNT(*) FROM employer) AS total_employers, (SELECT COUNT(*) FROM connection) AS total_connections;', null, callback);
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
    return executeQuery('SELECT YEAR(account_created) AS year, COUNT(*) AS registrations FROM candidate GROUP BY YEAR(account_created) ORDER BY year;', null, callback);
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
    return executeQuery('SELECT gender, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM candidate) AS percentage FROM candidate GROUP BY gender;', null, callback);
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
    return executeQuery('SELECT ethnicity, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM candidate) AS percentage FROM candidate GROUP BY ethnicity;', null, callback);
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
    return executeQuery('SELECT user_type, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM authentication) AS percentage FROM authentication GROUP BY user_type;', null, callback);
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
    return executeQuery(`SELECT 'Completed Profile' AS completion_status, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM authentication WHERE candidate_id IS NOT NULL) AS percentage FROM authentication WHERE candidate_id IS NOT NULL;`, null, callback);
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
    return executeQuery(`SELECT 'Completed Profile' AS profile_status, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM authentication WHERE employer_id IS NOT NULL) AS percentage FROM authentication WHERE employer_id IS NOT NULL;`, null, callback);
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