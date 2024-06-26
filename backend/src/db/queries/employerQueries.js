import connection from '../connection.js'
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
    connection.query('SELECT * FROM employer', (err, res) => {
        if (err) {
            console.error('Error fetching employers: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
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
    connection.query('SELECT * FROM employer WHERE employer_id = ?', employerId, (err, res) => {
        if (err) {
            console.error('Error fetching employer with ID ', employerId, ': ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
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
    connection.query('INSERT INTO employer SET ?', employerData, (err, res) => {
        if (err) {
            console.error('Error inserting employer: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
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
    connection.query('UPDATE employer SET ? WHERE employer_id = ?', [employerData, employerId], (err, res) => {
        if (err) {
            console.error('Error updating employer: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
}

/**
 * Deletes an employer from the database along with associated data such as notifications and authentication.
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
    // Delete notifications associated with the employer
    connection.query('DELETE FROM connection where employer_id = ?', employerId, (err, res) => {
        if (err) {
            console.error('Error deleting connections: ', err);
            return callback(err, null);
        }
    })

    // Delete authentication data associated with the employer
    connection.query('DELETE FROM authentication WHERE employer_id = ?', employerId, (err, res) => {
        if (err) {
            console.error('Error deleting authentication: ', err);
            return callback(err, null);
        }
    })

    // Delete the employer from the database
    connection.query('DELETE FROM employer WHERE employer_id = ?', employerId, (err, res) => {
        if (err) {
            console.error('Error deleting employer: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
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
    connection.query(query, employerId, (err, res) => {
        if (err) {
            console.error('Error fetching employer connections: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

export {
    selectAllEmployers,
    selectEmployerByID,
    createEmployer,
    updateEmployer,
    deleteEmployer,
    getEmployerConnections,
}