const connection = require('../connection');

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

function selectCandidateByFilter(filters, callback) {
    const query =
    `
    SELECT c.*, GROUP_CONCAT(s.skill) AS skills
    FROM candidates c
    LEFT JOIN candidate_skills cs on c.candidate_id = cs.candidate_id
    LEFT JOIN skills s on cs.skill_id = s.skill_id
    WHERE 1=1
    `

    if (filters.graduationStartDate && filters.graduationEndDate) {
        query += ' AND c.graduation_date BETWEEN ? AND ?';
    } 
     // Filter for dates after or equal to graduationDateStart
    else if (filters.graduationDateStart) {
        sqlQuery += ` AND c.graduation_date >= ?`;
    } 
    // Filter for dates before or equal to graduationDateEnd
    else if (filters.graduationDateEnd) {
        sqlQuery += ` AND c.graduation_date <= ?`;
    }

    if (filters.fieldOfStudy) {
        query += ' AND c.field_of_study = ?';
    }

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

function createCandidate(candidateData, callback) {
    connection.query('INSERT INTO candidates SET ?', candidateData, (err, res) => {
        if (err) {
            console.error('Error inserting candidate: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

function updateCandidate(candidateData, candidateId, callback) {
    connection.query('UPDATE candidates SET ? WHERE candidate_id = ?', [candidateData, candidateId], (err, res) => {
        if (err) {
            console.error('Error updating candidate: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

function deleteCandidate(candidateId, callback) {
    connection.query('DELETE FROM notification WHERE candidate_id = ?', candidateId, (err, notificationDeleteResult) => {
        if (err) {
            console.error('Error deleting candidate notifications: ', err);
            return callback(err, null);
        }
    });

    connection.query('DELETE FROM authentication WHERE candidate_id = ?', candidateId, (err, authenticationDeleteResult) => {
        if (err) {
            console.error('Error deleting candidate authentication: ', err);
            return callback(err, null);
        }
    });

    connection.query('SELECT COUNT(*) AS skillCount FROM candidate_skills WHERE candidate_id = ?', candidateId, (err, skillCountResult) => {
        if (err) {
            console.error('Error checking candidate skills: ', err);
            return callback(err, null);
        }

        const skillCount = skillCountResult[0].skillCount;

        if (skillCount === 0) {
            connection.query('DELETE FROM candidates WHERE candidate_id = ?', candidateId, (err, candidateDeleteResult) => {
                if (err) {
                    console.error('Error deleting candidate: ', err);
                    return callback(err, null);
                }

                callback(null, candidateDeleteResult);
            });
        } else {
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
    createCandidate,
    updateCandidate,
    deleteCandidate,
};
