const connection = require('../connection');

/**
 * Retrieves all skills from the database.
 * 
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function selectAllSkills(callback) {
    connection.query('SELECT * FROM skills', (err, res) => {
        if (err) {
            console.error('Error fetching skills: ', err);
            return callback(err, null);
        }
        callback(null, res);
    });
}

/**
 * Creates skills for a candidate in the database.
 * 
 * @param {*} candidateId The unique identifier of the candidate for whom the 
 * skills are to be created.
 * @param {*} skillsData An object containing the skills data to be created.
 * @param {*} callback 
 * A callback function to handle the result of the database query.
 *   The callback follows the standard Node.js pattern: (err, result) => {...}
 * - If an error occurs during the query execution, `err` will contain the error 
 *   object.
 * - If the query is successful, `res` will contain the fetched candidates.
 */
function createSkills(candidateId, skillsData, callback) {
    const skills = Object.keys(skillsData);
    
    // Retrieve skill IDs for the provided skill names
    connection.query('SELECT skill_id, skill FROM skills WHERE skill IN (?)', [skills], (err, res) => {
        if (err) {
            console.error('Error retrieving skill IDs: ', err);
            return callback(err, null);
        }
        
        // Map skill names to their respective IDs
        const skillIdMap = {};
        res.forEach(row => {
            skillIdMap[row.skill] = row.skill_id;
        });
        
        // Prepare skill inserts for the candidate
        const skillInserts = [];
        skills.forEach(skillName => {
            const skillId = skillIdMap[skillName];
            if (skillId) {
                skillInserts.push([candidateId, skillId]);
            } else {
                console.warn(`Skill '${skillName}' not found in the database.`);
            }
        });
        
        // Insert candidate skills into the database
        const insertSkillsQuery = 'INSERT INTO candidate_skills (candidate_id, skill_id) VALUES ?';
        connection.query(insertSkillsQuery, [skillInserts], (err, skillResult) => {
            if (err) {
                console.error('Error inserting candidate skills: ', err);
                return callback(err, null);
            }
            
            callback(null, skillResult);
        });
    });
}


module.exports = {
    selectAllSkills,
    createSkills,
};
