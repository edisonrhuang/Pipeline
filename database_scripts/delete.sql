DELETE FROM candidates WHERE candidate_id > 0;
DELETE FROM employer WHERE employer_id > 0;
DELETE FROM skills WHERE candidate_id > 0;

DROP TABLE skills;
DROP TABLE notification;
DROP TABLE website;
DROP TABLE field_of_study;
DROP TABLE candidates;
DROP TABLE employer;