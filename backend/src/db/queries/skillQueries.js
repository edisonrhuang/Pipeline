const executeQuery = require('./executeQuery');

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
    return executeQuery('SELECT * FROM skill', null, callback);
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
    executeQuery('SELECT skill_id, skill_name FROM skill WHERE skill_name IN (?)', [skills], (err, res) => {
        if (err) {
            console.error('Error retrieving skill IDs: ', err);
            return callback(err, null);
        }

        const skillIdMap = {};
        res.forEach(row => {
            skillIdMap[row.skill_name] = row.skill_id;
        });

        const skillInserts = [];
        skillIdMap.forEach(skillName => {
            const skillId = skillIdMap[skillName];
            if (skillId) {
                skillInserts.push([candidateId, skillId, skillsData[skillName]]);
            } else {
                console.warn(`Skill '${skillName}' not found in the database.`);
            }
        });

        return executeQuery('INSERT INTO candidate_skill (candidate_id, skill_id) VALUES ?', [skillInserts], callback);
    });
}

module.exports = {
    selectAllSkills,
    createSkills,
};