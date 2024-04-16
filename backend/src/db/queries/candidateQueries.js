const connection = require('../connection');

/**
 * Retrieves all candidates along with their associated skills from the 
 * database.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function selectAllCandidates(callback) {
    const query =
    `
    SELECT c.*, GROUP_CONCAT(s.skill) AS skills
    FROM candidates c
    LEFT JOIN candidate_skills cs ON c.candidate_id = cs.candidate_id
    LEFT JOIN skills s on cs.skill_id = s.skill_id
    GROUP BY c.candidate_id;
    `;
    connection.query(query, (err, res) => {
        if (err) {
            console.error('Error fetching candidates: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}


/**
 * Retrieves a candidate by their unique identifier along with their associated 
 * skills from the database.
 * 
 * @param {*} candidateId The unique identifier of the candidate to retrieve.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function selectCandidateByID(candidateId, callback) {
    const query =
    `
    SELECT c.*, GROUP_CONCAT(s.skill) AS skills
    FROM candidates c
    LEFT JOIN candidate_skills cs ON c.candidate_id = cs.candidate_id
    LEFT JOIN skills s on cs.skill_id = s.skill_id
    WHERE c.candidate_id = ?
    GROUP BY c.candidate_id;
    `;
    connection.query(query, candidateId, (err, res) => {
        if (err) {
            console.error('Error fetching candidate with ID ', candidateId, ': ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Retrieves candidates from the database based on specified filters, along with
 * their associated skills.
 * 
 * @param {*} filters 
 * An object containing filters to apply to the candidate selection.
 * - `graduationStartDate`: The start date for filtering candidates by 
 * graduation date.
 * - `graduationEndDate`: The end date for filtering candidates by graduation 
 * date.
 * - `fieldOfStudy`: The field of study for filtering candidates.
 * - `skills`: An array of skills used to filter candidates by their skills.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function selectCandidateByFilter(filters, callback) {
    const query =
    `
    SELECT c.*, GROUP_CONCAT(s.skill) AS skills
    FROM candidates c
    LEFT JOIN candidate_skills cs on c.candidate_id = cs.candidate_id
    LEFT JOIN skills s on cs.skill_id = s.skill_id
    WHERE 1=1
    `

    // Check if both graduation start and end date are provided in the filters
    if (filters.graduationStartDate && filters.graduationEndDate) {
        query += ' AND c.graduation_date BETWEEN ? AND ?';
    }

    // Check if field of study filter is provided
    if (filters.fieldOfStudy) {
        query += ' AND c.field_of_study = ?';
    }

    // Check if skills filter is provided and contains at least one skill
    if (filters.skills && filters.skills.length > 0) {
        sqlQuery += ` AND s.skill IN (?)`;
    }

    query += ' GROUP BY c.candidate_id;'

    connection.query(query, [filters.graduationStartDate, filters.graduationEndDate, filters.fieldOfStudy, filters.skills], (err, res) => {
        if (err) {
            console.error('Error fetching candidates with filters: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Creates a new candidate in the database using the provided candidate data.
 * 
 * @param {*} candidateData 
 * An object containing the data of the candidate to be created.
 * The object should include properties such as `name`, `email`, 
 * `graduation_date`, etc.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function createCandidate(candidateData, callback) {
    connection.query('INSERT INTO candidates SET ?', candidateData, (err, res) => {
        if (err) {
            console.error('Error inserting candidate: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Updates an existing candidate in the database with the provided candidate 
 * data.
 * 
 * @param {*} candidateData An object containing the updated data of the 
 * candidate.
 * @param {*} candidateId The unique identifier of the candidate to be updated.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function updateCandidate(candidateData, candidateId, callback) {
    connection.query('UPDATE candidates SET ? WHERE candidate_id = ?', [candidateData, candidateId], (err, res) => {
        if (err) {
            console.error('Error updating candidate: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

/**
 * Deletes a candidate from the database along with associated data such as 
 * notifications, authentication, and skills.
 * 
 * @param {*} candidateId The unique identifier of the candidate to be deleted.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function deleteCandidate(candidateId, callback) {
    // Delete notifications associated with the candidate
    connection.query('DELETE FROM notification WHERE candidate_id = ?', candidateId, (err, notificationDeleteResult) => {
        if (err) {
            console.error('Error deleting candidate notifications: ', err);
            return callback(err, null);
        }
    });

    // Delete authentication data associated with the candidate
    connection.query('DELETE FROM authentication WHERE candidate_id = ?', candidateId, (err, authenticationDeleteResult) => {
        if (err) {
            console.error('Error deleting candidate authentication: ', err);
            return callback(err, null);
        }
    });

    // Check the number of skills associated with the candidate
    connection.query('SELECT COUNT(*) AS skillCount FROM candidate_skills WHERE candidate_id = ?', candidateId, (err, skillCountResult) => {
        if (err) {
            console.error('Error checking candidate skills: ', err);
            return callback(err, null);
        }

        const skillCount = skillCountResult[0].skillCount;

        // If candidate has no skills, directly delete the candidate
        if (skillCount === 0) {
            connection.query('DELETE FROM candidates WHERE candidate_id = ?', candidateId, (err, candidateDeleteResult) => {
                if (err) {
                    console.error('Error deleting candidate: ', err);
                    return callback(err, null);
                }

                callback(null, candidateDeleteResult);
            });
        }
        // Else, first delete the associated skills, then delete the candidate
        else {
            connection.query('DELETE FROM candidate_skills WHERE candidate_id = ?', candidateId, (err, skillDeleteResult) => {
                if (err) {
                    console.error('Error deleting candidate skills: ', err);
                    return callback(err, null);
                }

                connection.query('DELETE FROM candidates WHERE candidate_id = ?', candidateId, (err, candidateDeleteResult) => {
                    if (err) {
                        console.error('Error deleting candidate: ', err);
                        return callback(err, null);
                    }
                    return callback(null, candidateDeleteResult);
                });
            });
        }
    });
}

module.exports = {
    selectAllCandidates,
    selectCandidateByID,
    selectCandidateByFilter,
    createCandidate,
    updateCandidate,
    deleteCandidate,
};