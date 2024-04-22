const executeQuery = require('./executeQuery');

/**
 * Retrieves all employers from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function selectAllEmployers(callback) {
    return executeQuery('SELECT * FROM employer', null, callback);
}

/**
 * Retrieves an employer by their unique identifier from the database.
 * 
 * @param {*} employerId The unique identifier of the employer to retrieve.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function selectEmployerByID(employerId, callback) {
    return executeQuery('SELECT * FROM employer WHERE employer_id = ?', employerId, callback);
}

/**
 * Creates a new employer in the database using the provided employer data.
 * 
 * @param {*} employerData An object containing the data of the employer to be 
 * created.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function createEmployer(employerData, callback) {
    return executeQuery('INSERT INTO employer SET ?', employerData, callback);
}

/**
 * Updates an existing employer in the database with the provided employer data.
 * 
 * @param {*} employerData An object containing the updated data of the 
 * employer.
 * @param {*} employerId The unique identifier of the employer to be updated.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function updateEmployer(employerData, employerId, callback) {
    return executeQuery('UPDATE employer SET ? WHERE employer_id = ?', [employerData, employerId], callback);
}

/**
 * Deletes an employer from the database along with associated data such as 
 * connections and authentication.
 * 
 * @param {*} employerId The unique identifier of the employer to be deleted.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function deleteEmployer(employerId, callback) {
    // Delete connections associated with the employer
    executeQuery('DELETE FROM connection WHERE employer_id = ?', employerId, callback);

    // Delete authentication data associated with the employer
    executeQuery('DELETE FROM authentication WHERE employer_id = ?', employerId, callback);

    // Delete the employer from the database
    return executeQuery('DELETE FROM employer WHERE employer_id = ?', employerId, callback);
}

/**
 * Retrieves connections of a candidate from the database.
 * @param {*} candidateId The ID of the candidate whose connections are to be 
 * retrieved.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function getEmployerConnections(employerId, callback) {
    const query =
    `
    SELECT c.*
    FROM connection cn
    JOIN candidate c ON cn.candidate_id = c.candidate_id
    WHERE cn.employer_id = ?;
    `;
    return executeQuery(query, employerId, callback);
}

module.exports = {
    selectAllEmployers,
    selectEmployerByID,
    createEmployer,
    updateEmployer,
    deleteEmployer,
    getEmployerConnections,
}