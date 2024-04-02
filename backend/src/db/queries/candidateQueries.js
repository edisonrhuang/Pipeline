const connection = require('../connection');

function selectAllCandidates(callback) {
    const query = 'SELECT * FROM candidates';
    connection.query(query, (err, res) => {
        if (err) {
            console.error('Error fetching candidates: ', err);
            return callback(err, null);
        }
        callback(null, res);
    });
}

function createCandidate(candidateData, callback) {
    const query = 'INSERT INTO candidates SET ?';
    connection.query(query, candidateData, (err, res) => {
        if (err) {
            console.error('Error insertin candidate: ', err);
            return callback(err, null);
        }
        callback(null, res);
    });
}

function updateCandidate(candidateData, candidateId, callback) {
    const query = 'UPDATE candidates SET ? WHERE candidate_id = ?';
    connection.query(query, [candidateData, candidateId], (err, res) => {
        if (err) {
            console.error('Error updating candidate: ', err);
            return callback(err, null);
        }
        callback(null, res);
    });
}

function deleteCandidate(candidateId, callback) {
    const query = 'DELETE FROM candidates WHERE candidate_id = ?';
    connection.query(query, candidateId, (err, res) => {
        if (err) {
            console.error('Error deleting candidate: ', err);
            return callback(err, null);
        }
        callback(null, res);
    })
}

module.exports = {
    selectAllCandidates,
    createCandidate,
    updateCandidate,
    deleteCandidate,
};