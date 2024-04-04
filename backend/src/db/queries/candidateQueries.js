const connection = require('../connection');

function selectAllCandidates(callback) {
    connection.query('SELECT * FROM candidates', (err, res) => {
        if (err) {
            console.error('Error fetching candidates: ', err);
            return callback(err, null);
        }
        callback(null, res);
    });
}

function createCandidate(candidateData, callback) {
    connection.query('INSERT INTO candidates SET ?', candidateData, (err, res) => {
        if (err) {
            console.error('Error inserting candidate: ', err);
            return callback(err, null);
        }

        callback(null, res);
    });
}

function updateCandidate(candidateData, candidateId, callback) {
    connection.query('UPDATE candidates SET ? WHERE candidate_id = ?', [candidateData, candidateId], (err, res) => {
        if (err) {
            console.error('Error updating candidate: ', err);
            return callback(err, null);
        }
        callback(null, res);
    });
}

function deleteCandidate(candidateId, callback) {
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
                    callback(null, candidateDeleteResult);
                });
            });
        }
    });
}

module.exports = {
    selectAllCandidates,
    createCandidate,
    updateCandidate,
    deleteCandidate,
};
