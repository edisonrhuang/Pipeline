CREATE DATABASE pipeline_database;
USE pipeline_database;

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

INSERT INTO candidates (first_name, last_name, date_of_birth, email, phone_number, gender, ethnicity, graduation_date, account_created) VALUES 
('Edison', 'Huang', '2002-11-26', 'edisonrhuang@vt.edu', '3016559732', 'Male', 'Asian/Pacific Islander', '2025-05-12', '2025-3-15'),
('Sandiliya', 'Bhamidipati', '2003-08-19', 'sandiroc@vt.edu', '9083427668', 'Male', 'Asian/Pacific Islander', '2024-05-13', '2025-3-15'),
('Bivash', 'Oli', '2003-06-06', 'bivasholi@vt.edu', '5712473998', 'Male', 'Asian/Pacific Islander', '2025-05-12', '2025-3-15'),
('Tessa', 'Ryan', '2003-04-08', 'tessar@vt.edu', '5716068839', 'Female', 'Asian/Pacific Islander', '2025-05-12', '2025-3-15'),
('Ethan', 'Chi', '2003-11-05', 'ethanc03@example.com', '7034209566', 'Male', 'Asian/Pacific Islander', '2025-05-12', '2025-03-15');

INSERT INTO candidates (first_name, last_name, email, phone_number, date_of_birth, info, gender, ethnicity, graduation_date, account_created) VALUES
('John', 'Doe', 'john.doe@example.com', '123-456-7890', '1990-05-15', 'Experienced software engineer with expertise in Java and Python.', 'Male', 'White/Caucasian', '2014-06-30', '2024-03-01'),
('Alice', 'Smith', 'alice.smith@example.com', '987-654-3210', '1992-09-20', 'Recent graduate with a degree in Computer Science.', 'Female', 'White/Caucasian', '2023-05-25', '2024-03-02'),
('Michael', 'Johnson', 'michael.johnson@example.com', '456-789-0123', '1988-12-10', 'Senior project manager with 10+ years of experience in IT industry.', 'Male', 'Black or African American', '2010-08-15', '2024-03-03'),
('Emily', 'Brown', 'emily.brown@example.com', '789-012-3456', '1995-04-28', 'Entry-level software developer eager to learn and contribute.', 'Female', 'Hispanic', '2022-12-20', '2024-03-04'),
('David', 'Martinez', 'david.martinez@example.com', '321-654-9870', '1993-07-03', 'Experienced data analyst with proficiency in SQL and data visualization tools.', 'Male', 'Hispanic', '2016-05-30', '2024-03-05'),
('Jennifer', 'Nguyen', 'jennifer.nguyen@example.com', '654-321-0987', '1991-11-15', 'Marketing specialist with a focus on digital marketing strategies.', 'Female', 'Asian/Pacific Islander', '2013-09-10', '2024-03-06'),
('Daniel', 'Lee', 'daniel.lee@example.com', '012-345-6789', '1994-03-20', 'Recent graduate with a degree in Electrical Engineering.', 'Male', 'Asian/Pacific Islander', '2023-06-25', '2024-03-07'),
('Emma', 'Garcia', 'emma.garcia@example.com', '987-654-3210', '1996-08-05', 'Internship experience in web development and UI/UX design.', 'Female', 'Hispanic', '2022-05-20', '2024-03-08'),
('Ryan', 'Kim', 'ryan.kim@example.com', '789-012-3456', '1989-02-18', 'Experienced software engineer specializing in backend development.', 'Male', 'Asian/Pacific Islander', '2012-07-30', '2024-03-09'),
('Jessica', 'Wong', 'jessica.wong@example.com', '321-654-9870', '1990-06-25', 'Product manager with a track record of successful product launches.', 'Female', 'Asian/Pacific Islander', '2013-10-15', '2024-03-10'),
('Matthew', 'Rodriguez', 'matthew.rodriguez@example.com', '012-345-6789', '1987-09-12', 'Experienced data scientist skilled in machine learning algorithms.', 'Male', 'Hispanic', '2011-06-30', '2024-03-11'),
('Ava', 'Chen', 'ava.chen@example.com', '456-789-0123', '1997-01-30', 'Recent graduate with a degree in Business Administration.', 'Female', 'Asian/Pacific Islander', '2023-05-28', '2024-03-12'),
('James', 'Lopez', 'james.lopez@example.com', '987-654-3210', '1992-04-15', 'Experienced project manager with a focus on Agile methodologies.', 'Male', 'Hispanic', '2015-07-20', '2024-03-13'),
('Olivia', 'Wang', 'olivia.wang@example.com', '789-012-3456', '1994-10-22', 'Frontend developer with expertise in HTML, CSS, and JavaScript.', 'Female', 'Asian/Pacific Islander', '2018-05-25', '2024-03-14'),
('William', 'Gomez', 'william.gomez@example.com', '321-654-9870', '1986-03-08', 'Experienced software engineer with a focus on mobile app development.', 'Male', 'Hispanic', '2010-08-30', '2024-03-15');