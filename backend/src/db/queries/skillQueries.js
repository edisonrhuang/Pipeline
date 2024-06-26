import connection from "../connection.js";
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
    connection.query('SELECT * FROM skill', (err, res) => {
        if (err) {
            console.error('Error fetching skills: ', err);
            return callback(err, null);
        }
        return callback(null, res);
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
    const skills = skillsData
    
    // Retrieve skill IDs for the provided skill names
    connection.query('SELECT skill_id, skill_name FROM skill WHERE skill_name IN (?)', [skills], (err, res) => {
        if (err) {
            console.error('Error retrieving skill IDs: ', err);
            return callback(err, null);
        }
        
        // Map skill names to their respective IDs
        const skillIdMap = {};
        res.forEach(row => {
            skillIdMap[row.skill_name] = row.skill_id;
        });
        
        // Prepare skill inserts for the candidate
        skills.forEach(skillName => {
            let skillId = skillIdMap[skillName];
            if (skillId) {
                insertSkill(candidateId, skillId)
            } else {
                connection.query('INSERT INTO skill (skill_name) VALUES (?)', [skillName], (err, skillInsertResult) => {
                    if (err) {
                        console.error('Error inserting skill: ', err);
                        return callback(err, null);
                    }
                    skillId = skillInsertResult.insertId;
                    insertSkill(candidateId, skillId);
                })
            }
        });

        return callback(null, res);
    });
}

function insertSkill(candidateId, skillId) {
    const insertSkillsQuery = 'INSERT INTO candidate_skill (candidate_id, skill_id) VALUES (?, ?)';
    connection.query(insertSkillsQuery, [candidateId, skillId], (err, skillResult) => {
        if (err) {
            console.error('Error inserting candidate skills: ', err);
        }
    });
}

export {
    selectAllSkills,
    createSkills,
}