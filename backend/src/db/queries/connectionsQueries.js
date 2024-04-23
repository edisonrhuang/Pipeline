import connection from "../connection.js"

function createConnection(candidateId, employerId, callback) {
     connection.query('INSERT INTO connection (candidate_id, employer_id) VALUES (?, ?)', [candidateId, employerId], (err, res) => {
          if (err) {
               console.error('Error creating connection: ', err);
               return callback(err, null);
          }
          return callback(null, res);
     });
}

function deleteConnection(candidateId, employerId, callback) {
     connection.query('DELETE FROM connection WHERE candidate_id = ? AND employer_id = ?', [candidateId, employerId], (err, res) => {
          if (err) {
               console.error('Error deleting connection: ', err);
               return callback(err, null);
          }
          return callback(null, res);
     })
}

export {
     createConnection,
     deleteConnection
}