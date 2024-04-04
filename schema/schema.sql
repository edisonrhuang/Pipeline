/* Drops the pipeline_database if it already exists */
DROP DATABASE IF EXISTS pipeline_database;

/* Creates/Recreates the pipeline_database and selects it */
CREATE DATABASE pipeline_database;
USE pipeline_database;

/* Creates a table for candidates */
CREATE TABLE candidates (
	/* Candidate's personal information */
    candidate_id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    date_of_birth DATE NOT NULL,
    info VARCHAR(5000),
    gender ENUM('Male', 'Female', 'Prefer not to say', 'Others'),
    ethnicity ENUM ('American Indian or Alaskan Native', 'Asian/Pacific Islander', 'Black or African American', 'Hispanic', 'White/Caucasian', 'Two or more', 'Other'),
    
    /* Candidate's academic information */
    graduation_date DATE NOT NULL,
    field_of_study VARCHAR(75) NOT NULL,
    website VARCHAR(2048),
    
    /* Candidate's account information */
    account_created DATE NOT NULL,
    profile_picture MEDIUMBLOB,
	PRIMARY KEY (candidate_id)
);

/* Creates an index on the candidate_id of the candidates table */
CREATE INDEX candidate_index ON candidates (candidate_id);

/* Creates a table for skills */
CREATE TABLE skills (
	skill_id int NOT NULL AUTO_INCREMENT,
    skill VARCHAR(100),
    PRIMARY KEY (skill_id)
);

/* Creates a table that forms the relationship between candidates and skills */
CREATE TABLE candidate_skills (
	candidate_id int,
    skill_id int,
    FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

/* Creates an index on the candidate_id and skill_id of the candidate_skill table */
CREATE INDEX candidate_skills_index ON candidate_skills (candidate_id, skill_id);

/* Creates a table for employers */
CREATE TABLE employer (
    employer_id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    info VARCHAR(5000),
    PRIMARY KEY (employer_id)
);

/* Creates a table for notifications */ 
CREATE TABLE notification (
    notification_id NUMERIC(9, 0) PRIMARY KEY,
    content VARCHAR(5000),
    candidate_id int NOT NULL, 
    FOREIGN KEY (candidate_id) REFERENCES candidates(candidate_id),
    employer_id int NOT NULL,
    FOREIGN KEY (employer_id) REFERENCES employer(employer_id)
);

/* Creates an index on the candidate_id and employer_id of the notification table */
CREATE INDEX notification_index ON notification (candidate_id, employer_id);

/* Main candidate insertion */
INSERT INTO candidates (first_name, last_name, email, phone_number, date_of_birth, info, gender, ethnicity, graduation_date, field_of_study, website, account_created, profile_picture)
VALUES
('Edison', 'Huang', 'edisonrhuang@vt.edu', '3016559732', '2002-11-26', NULL, 'Male', 'Asian/Pacific Islander', '2025-05-12', 'Computer Science', NULL, '2025-1-1', NULL),
('Sandiliya', 'Bhamidipati', 'sandiroc@vt.edu', '9083427668', '2003-08-19', NULL, 'Male', 'Asian/Pacific Islander', '2024-05-13', 'Computational Modeling and Data Analytics', NULL, '2025-1-1', NULL),
('Bivash', 'Oli', 'bivasholi@vt.edu', '5712473998', '2003-06-06', NULL, 'Male', 'Asian/Pacific Islander', '2025-05-12', 'Computer Science', NULL, '2025-1-1', NULL),
('Tessa', 'Ryan', 'tessar@vt.edu', '5716068839', '2003-04-08', NULL, 'Female', 'Asian/Pacific Islander', '2025-05-12', 'Computational Modeling and Data Analytics', NULL, '2025-1-1', NULL),
('Ethan', 'Chi', 'ethanc03@example.com', '7034209566', '2003-11-05', NULL, 'Male', 'Asian/Pacific Islander', '2025-05-12', 'Industrial and Systems Engineering', NULL, '2025-1-1', NULL);

/* Filler candidate insertion */
INSERT INTO candidates (first_name, last_name, email, phone_number, date_of_birth, info, gender, ethnicity, graduation_date, field_of_study, website, account_created, profile_picture) VALUES
('John', 'Doe', 'john.doe@example.com', '1234567890', '1990-05-15', 'Experienced software engineer specializing in backend development.', 'Male', 'White/Caucasian', '2012-06-30', 'Computer Science', 'http://www.johndoe.com', '2024-04-03', NULL),
('Jane', 'Smith', 'jane.smith@example.com', '1987654321', '1992-09-20', 'Recent graduate with a passion for data analysis and visualization.', 'Female', 'Black or African American', '2023-05-25', 'Data Science', 'http://www.janesmith.com', '2024-04-03', NULL),
('David', 'Brown', 'david.brown@example.com', '1122334455', '1991-03-10', 'Seasoned marketing professional with expertise in digital marketing strategies.', 'Male', 'Hispanic', '2013-08-15', 'Marketing', 'http://www.davidbrown.com', '2024-04-03', NULL),
('Emily', 'Johnson', 'emily.johnson@example.com', '5550998877', '1993-11-28', 'Skilled graphic designer with a keen eye for detail and creativity.', 'Female', 'Asian/Pacific Islander', '2020-12-20', 'Graphic Design', 'http://www.emilyjohnson.com', '2024-04-03', NULL),
('Michael', 'Williams', 'michael.williams@example.com', '6665557777', '1990-07-04', 'Seasoned project manager adept at leading cross-functional teams to success.', 'Male', 'White/Caucasian', '2012-05-30', 'Business Administration', 'http://www.michaelwilliams.com', '2024-04-03', NULL),
('Sarah', 'Martinez', 'sarah.martinez@example.com', '4444777666', '1992-02-18', 'Energetic sales professional with a proven track record of exceeding targets.', 'Female', 'Hispanic', '2014-07-10', 'Sales', 'http://www.sarahmartinez.com', '2024-04-03', NULL),
('Matthew', 'Nguyen', 'matthew.nguyen@example.com', '7778889999', '1991-08-12', 'Highly motivated mechanical engineer with a focus on sustainable design.', 'Male', 'Asian/Pacific Islander', '2013-06-15', 'Mechanical Engineering', 'http://www.matthewnguyen.com', '2024-04-03', NULL),
('Emma', 'Garcia', 'emma.garcia@example.com', '2233445566', '1993-04-30', 'Creative fashion designer with a flair for innovative designs.', 'Female', 'Hispanic', '2015-05-20', 'Fashion Design', 'http://www.emmagarcia.com', '2024-04-03', NULL),
('William', 'Chen', 'william.chen@example.com', '3332221111', '1990-12-08', 'Experienced financial analyst with expertise in risk management.', 'Male', 'Asian/Pacific Islander', '2012-08-30', 'Finance', 'http://www.williamchen.com', '2024-04-03', NULL),
('Olivia', 'Taylor', 'olivia.taylor@example.com', '8887776655', '1992-01-25', 'Passionate educator dedicated to fostering a love for learning in students.', 'Female', 'White/Caucasian', '2014-06-28', 'Education', 'http://www.oliviataylor.com', '2024-04-03', NULL),
('James', 'Rodriguez', 'james.rodriguez@example.com', '9997775544', '1991-06-03', 'Dynamic software developer with expertise in full-stack web development.', 'Male', 'Hispanic', '2013-09-15', 'Computer Science', 'http://www.jamesrodriguez.com', '2024-04-03', NULL),
('Ava', 'Lopez', 'ava.lopez@example.com', '6668884444', '1993-03-22', 'Skilled journalist with a passion for investigative reporting.', 'Female', 'Hispanic', '2015-07-20', 'Journalism', 'http://www.avalopez.com', '2024-04-03', NULL),
('Daniel', 'Lee', 'daniel.lee@example.com', '5554446699', '1990-10-17', 'Experienced accountant with a strong background in auditing and financial analysis.', 'Male', 'Asian/Pacific Islander', '2012-05-30', 'Accounting', 'http://www.daniellee.com', '2024-04-03', NULL),
('Sophia', 'Jackson', 'sophia.jackson@example.com', '2229998888', '1992-07-14', 'Dedicated social worker committed to advocating for marginalized communities.', 'Female', 'Black or African American', '2014-08-25', 'Social Work', 'http://www.sophiajackson.com', '2024-04-03', NULL),
('Ethan', 'Hernandez', 'ethan.hernandez@example.com', '9994443322', '1991-04-05', 'Innovative product manager skilled in product development and launch strategies.', 'Male', 'Hispanic', '2013-10-10', 'Product Management', 'http://www.ethanhernandez.com', '2024-04-03', NULL);

/* Insertion of CS programming languages */
INSERT INTO skills (skill) VALUES
('Python'),
('Java'),
('C'),
('C++'),
('JavaScript'),
('SQL'),
('R'),
('Ruby'),
('Swift'),
('Go'),
('Scala'),
('Kotlin'),
('PHP'),
('C#'),
('HTML/CSS'),
('Matlab'),
('Perl'),
('Objective-C'),
('Shell Scripting (e.g., Bash)'),
('TypeScript');

/* Insertion of CS skills */
INSERT INTO skills (skill) VALUES
('Programming (e.g., Python, Java, C/C++)'),
('Data Structures and Algorithms'),
('Database Management (e.g., SQL)'),
('Web Development (e.g., HTML, CSS, JavaScript)'),
('Operating Systems Concepts'),
('Computer Architecture'),
('Networking Concepts'),
('Software Engineering Principles'),
('Object-Oriented Design'),
('Problem-Solving and Critical Thinking'),
('Mathematical Foundations (e.g., Discrete Mathematics, Calculus)'),
('Machine Learning and Artificial Intelligence'),
('Cybersecurity Principles'),
('Version Control Systems (e.g., Git)'),
('Linux/Unix Shell'),
('Parallel and Distributed Computing'),
('Mobile Development (e.g., Android, iOS)'),
('Cloud Computing'),
('Data Science and Big Data Technologies'),
('Natural Language Processing'),
('Computer Graphics'),
('UI/UX Design Principles');

/* Insertion of CMDA skills */
INSERT INTO skills (skill) VALUES
('Statistics and Probability'),
('Data Analysis Techniques'),
('Machine Learning Algorithms'),
('Data Visualization (e.g., Matplotlib, Seaborn)'),
('Big Data Technologies (e.g., Hadoop, Spark)'),
('Predictive Modeling'),
('Time Series Analysis'),
('Optimization Techniques'),
('Experimental Design'),
('Statistical Programming Languages (e.g., R, Python)'),
('Mathematical Modeling'),
('Quantitative Research Methods'),
('Geospatial Analysis'),
('Text Mining and Natural Language Processing'),
('Deep Learning'),
('Web Scraping'),
('Data Cleaning and Preprocessing'),
('Business Intelligence Tools'),
('Communication Skills for Data Presentation and Reporting');
