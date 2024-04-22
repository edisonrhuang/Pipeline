const executeQuery = require('./executeQuery');

function createConnection(candidateId, employerId, callback) {
    return executeQuery('INSERT INTO connection (candidate_id, employer_id) VALUES (?, ?)', [candidateId, employerId], callback);
}

function deleteConnection(candidateId, employerId, callback) {
    return executeQuery('DELETE FROM connection WHERE candidate_id = ? AND employer_id = ?', [candidateId, employerId], callback);
}

module.exports = {
    createConnection,
    deleteConnection,
}