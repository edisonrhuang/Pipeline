/* To run, highlight each individual query */

/* ======================
 * === Useful Queries ===
 * ======================
 */

/* Query the candidate table */
SELECT * FROM candidate;

/* Query the candidate + skill table */
SELECT c.*, GROUP_CONCAT(s.skill_name) AS skills
FROM candidate c
JOIN candidate_skill cs ON c.candidate_id = cs.candidate_id
JOIN skill s on cs.skill_id = s.skill_id
GROUP BY c.candidate_id;

/* Query the skill table */
SELECT * FROM skill;

/* Query the candidate_skill table */
SELECT * FROM candidate_skill;

/* Query the employer table */
SELECT * FROM employer;

/* Query the authentication table */
SELECT * FROM authentication;

