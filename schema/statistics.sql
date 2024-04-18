/*
============================
=== Statistical Analysis ===
============================
*/

-- Distribution of candidates by gender
SELECT gender, COUNT(*) AS count
FROM candidate
GROUP BY gender;

-- Distribution of candidates by ethnicity
SELECT ethnicity, COUNT(*) AS count
FROM candidate
GROUP BY ethnicity;

-- Age distribution of candidates based on their date of birth
SELECT YEAR(CURDATE()) - YEAR(date_of_birth) - (RIGHT(CURDATE(), 5) < RIGHT(date_of_birth, 5)) AS age, COUNT(*) AS count
FROM candidate
GROUP BY age;

-- Count of candidates with each skill
SELECT skill_name, COUNT(*) AS count
FROM candidate_skill cs
JOIN skill s ON cs.skill_id = s.skill_id
GROUP BY skill_name;

-- Distribution of employers by industry (based on company names)
SELECT company_name, COUNT(*) AS count
FROM employer
GROUP BY company_name;

-- Distribution of users by user type
SELECT user_type, COUNT(*) AS count
FROM authentication
GROUP BY user_type;

-- Percentage of candidates and employers who have completed their profiles
SELECT user_type, SUM(CASE WHEN candidate_id IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*) AS completion_percentage
FROM authentication
GROUP BY user_type;

-- Number of connections established between candidates and employers
SELECT COUNT(*) AS count
FROM connection;

-- Distribution of connections by candidate attributes
SELECT c.gender, c.ethnicity, COUNT(*) AS count
FROM connection con
JOIN candidate c ON con.candidate_id = c.candidate_id
GROUP BY c.gender, c.ethnicity;

-- Total number of candidates, skills, employers, and connections in the database
SELECT
    (SELECT COUNT(*) FROM candidate) AS total_candidates,
    (SELECT COUNT(*) FROM skill) AS total_skills,
    (SELECT COUNT(*) FROM employer) AS total_employers,
    (SELECT COUNT(*) FROM connection) AS total_connections;

-- Growth rate of the database over time (assuming account_created represents registration time)
SELECT YEAR(account_created) AS year, COUNT(*) AS registrations
FROM candidate
GROUP BY YEAR(account_created)
ORDER BY year;

/*
=============================================
=== Percentage-based Statistical Analysis ===
=============================================
*/
-- Percentage of candidates by gender
SELECT gender, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM candidate) AS percentage
FROM candidate
GROUP BY gender;

-- Percentage of candidates by ethnicity
SELECT ethnicity, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM candidate) AS percentage
FROM candidate
GROUP BY ethnicity;

-- Percentage of users by user type
SELECT user_type, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM authentication) AS percentage
FROM authentication
GROUP BY user_type;

-- Percentage of candidates who have completed their profiles
SELECT 'Completed Profile' AS completion_status,
       COUNT(*) * 100.0 / (SELECT COUNT(*) FROM authentication WHERE candidate_id IS NOT NULL) AS percentage
FROM authentication
WHERE candidate_id IS NOT NULL;

-- Percentage of employers who have provided profile information
SELECT 'Profile Provided' AS profile_status,
       COUNT(*) * 100.0 / (SELECT COUNT(*) FROM authentication WHERE employer_id IS NOT NULL) AS percentage
FROM authentication
WHERE employer_id IS NOT NULL;

-- Percentage of connections by candidate attributes
SELECT c.gender,
       c.ethnicity,
       COUNT(*) * 100.0 / (SELECT COUNT(*) FROM connection) AS percentage
FROM connection con
JOIN candidate c ON con.candidate_id = c.candidate_id
GROUP BY c.gender, c.ethnicity;
