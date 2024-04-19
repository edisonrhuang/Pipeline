/* To run, highlight each individual query */

/* ======================
 * === Useful Queries ===
 * ======================
 */

-- Query the candidate table
SELECT * FROM candidate;

-- Query the candidate table with skills
SELECT c.*, GROUP_CONCAT(s.skill_name) AS skills
FROM candidate c
LEFT JOIN candidate_skill cs ON c.candidate_id = cs.candidate_id
LEFT JOIN skill s on cs.skill_id = s.skill_id
GROUP BY c.candidate_id;

-- Query a candidate's connections
SELECT e.*
FROM connection cn
JOIN employer e ON cn.employer_id = e.employer_id
WHERE cn.candidate_id = ?; -- Change ? to an id

-- Query a employer's connections
SELECT c.*
FROM connection cn
JOIN candidate c ON cn.candidate_id = c.candidate_id
WHERE cn.employer_id = ?; -- Change ? to an id

/*
 * ===========================
 * === Less Useful Queries ===
 * ===========================
 */

-- Query the skill table
SELECT * FROM skill;

-- Query the candidate_skill table
SELECT * FROM candidate_skill;

-- Query the employer table
SELECT * FROM employer;

-- Query the authentication table
SELECT * FROM authentication;

-- Query the connection table
SELECT * FROM connection;