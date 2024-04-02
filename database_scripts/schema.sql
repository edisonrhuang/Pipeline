CREATE DATABASE pipeline_database;

CREATE TABLE candidates (
    candidate_id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    date_of_birth DATE NOT NULL,
    info VARCHAR(5000),
    gender ENUM('Male', 'Female', 'Prefer not to say', 'Others'),
    ethnicity ENUM ('American Indian or Alaskan Native', 'Asian/Pacific Islander', 'Black or African American', 'Hispanic', 'White/Caucasian', 'Two or more', 'Other'),
    graduation_date DATE NOT NULL,
    account_created DATE NOT NULL,
    profile_picture MEDIUMBLOB,
	PRIMARY KEY (candidate_id)
);

CREATE INDEX candidate_index ON candidates (candidate_id);

CREATE TABLE employer (
    employer_id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    info VARCHAR(5000),
    PRIMARY KEY (employer_id)
);

CREATE TABLE skills (
    skill VARCHAR(50) NOT NULL,
    candidate_id int NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id)
);

CREATE INDEX skill_index ON skills (candidate_id);

CREATE TABLE notification (
    notification_id NUMERIC(9, 0) PRIMARY KEY,
    content VARCHAR(5000),
    candidate_id int NOT NULL, 
    FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id),
    employer_id int NOT NULL,
    FOREIGN KEY (employer_id) REFERENCES employer(employer_id)
);

CREATE INDEX notification_index ON notification (candidate_id, employer_id);

CREATE TABLE website (
    website VARCHAR(2048) NOT NULL,
    candidate_id int NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id)
);

CREATE INDEX website_index ON website (candidate_id);

CREATE TABLE field_of_study(
	field VARCHAR(75) NOT NULL,
    candidate_id int NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id)
);

CREATE INDEX field_of_study_index ON field_of_study (candidate_id);