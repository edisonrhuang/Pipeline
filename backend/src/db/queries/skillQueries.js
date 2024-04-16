const connection = require('../connection');

function selectAllSkills(callback) {
    connection.query('SELECT * FROM skills', (err, res) => {
        if (err) {
            console.error('Error fetching skills: ', err);
            return callback(err, null);
        }
        callback(null, res);
    });
}

function createSkills(candidateId, skillsData, callback) {
    const skills = Object.keys(skillsData);
    
    connection.query('SELECT skill_id, skill FROM skills WHERE skill IN (?)', [skills], (err, res) => {
        if (err) {
            console.error('Error retrieving skill IDs: ', err);
            return callback(err, null);
        }
        
        const skillIdMap = {};
        res.forEach(row => {
            skillIdMap[row.skill] = row.skill_id;
        });
        
        const skillInserts = [];
        skills.forEach(skillName => {
            const skillId = skillIdMap[skillName];
            if (skillId) {
                skillInserts.push([candidateId, skillId]);
            } else {
                console.warn(`Skill '${skillName}' not found in the database.`);
            }
        });
        
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
