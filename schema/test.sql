SELECT * FROM candidate;
SELECT * FROM skill;
SELECT * FROM employer;
SELECT * FROM authentication;

SELECT * FROM candidate_skill;

SELECT * FROM candidate NATURAL JOIN candidate_skill NATURAL JOIN skill;

/* Query all candidates and join with skills, if any */
SELECT c.*, GROUP_CONCAT(s.skill_name) AS skills
FROM candidate c
JOIN candidate_skill cs ON c.candidate_id = cs.candidate_id
JOIN skill s on cs.skill_id = s.skill_id
GROUP BY c.candidate_id;