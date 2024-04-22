-- Drops the pipeline_database if it exists
DROP DATABASE IF EXISTS pipeline_database;

-- Create and select the pipeline_database
CREATE DATABASE pipeline_database;
USE pipeline_database;

-- Candidate table creation
CREATE TABLE candidate (
	/* Candidate's personal information */
    candidate_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    date_of_birth DATE NOT NULL,
    info VARCHAR(5000),
    gender ENUM('Male', 'Female', 'Prefer not to say', 'Others'),
    ethnicity ENUM ('American Indian or Alaskan Native', 'Asian/Pacific Islander', 'Black or African American', 'Hispanic', 'White/Caucasian', 'Two or more', 'Other'),
    
    /* Candidate's academic information */
    school_name VARCHAR(75) NOT NULL,
    graduation_date DATE NOT NULL,
    field_of_study VARCHAR(75) NOT NULL,
    website VARCHAR(2048),
    resume_file MEDIUMBLOB,
    
    /* Candidate's account information */
    account_created DATE NOT NULL,
    profile_picture MEDIUMBLOB,
	PRIMARY KEY (candidate_id)
);

-- Creates an index on the candidate_id of the candidates table
CREATE INDEX candidate_index ON candidate (candidate_id);

-- Skill table creation
CREATE TABLE skill (
	skill_id INT NOT NULL AUTO_INCREMENT,
    skill_name VARCHAR(100),
    PRIMARY KEY (skill_id)
);

-- Candidate and skill relation table
CREATE TABLE candidate_skill (
	candidate_id INT,
    skill_id INT,
    FOREIGN KEY (candidate_id) REFERENCES candidate(candidate_id),
    FOREIGN KEY (skill_id) REFERENCES skill(skill_id)
);

-- Creates an index on the candidate_id and skill_id of the candidate_skill table
CREATE INDEX candidate_skill_index ON candidate_skill (candidate_id, skill_id);

-- Employer table creation
CREATE TABLE employer (
    employer_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(254) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    info VARCHAR(5000),
    profile_picture MEDIUMBLOB,
    PRIMARY KEY (employer_id)
);

-- Authentication table creation
CREATE TABLE authentication (
	email VARCHAR(254) NOT NULL UNIQUE,
    user_type ENUM('Candidate', 'Employer') NOT NULL,
    candidate_id INT,
    FOREIGN KEY (candidate_id) REFERENCES candidate(candidate_id),
    employer_id INT,
    FOREIGN KEY (employer_id) REFERENCES employer(employer_id)
);

-- Connection table creation
CREATE TABLE connection (
    candidate_id INT NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES candidate(candidate_id),
    employer_id INT NOT NULL,
    FOREIGN KEY (employer_id) REFERENCES employer(employer_id)
);

-- Candidate Insertions
INSERT INTO candidate (first_name, last_name, email, phone_number, date_of_birth, info, gender, ethnicity, school_name, graduation_date, field_of_study, website, resume_file, account_created, profile_picture)
VALUES
('Edison', 'Huang', 'edisonrhuang@vt.edu', '3016559732', '2002-11-26', NULL, 'Male', 'Asian/Pacific Islander', 'Virginia Tech', '2025-05-12', 'Computer Science', NULL, NULL, '2025-1-1', NULL),
('Sandiliya', 'Bhamidipati', 'sandiroc@vt.edu', '9083427668', '2003-08-19', NULL, 'Male', 'Asian/Pacific Islander', 'Virginia Tech', '2024-05-13', 'Computational Modeling and Data Analytics', NULL, NULL, '2025-1-1', NULL),
('Bivash', 'Oli', 'bivasholi@vt.edu', '5712473998', '2003-06-06', NULL, 'Male', 'Asian/Pacific Islander', 'Virginia Tech', '2025-05-12', 'Computer Science', NULL, NULL, '2025-1-1', NULL),
('Tessa', 'Ryan', 'tessar@vt.edu', '5716068839', '2003-04-08', NULL, 'Female', 'Asian/Pacific Islander', 'Virginia Tech', '2025-05-12', 'Computational Modeling and Data Analytics', NULL, NULL, '2025-1-1', NULL),
('Ethan', 'Chi', 'ethanc03@example.com', '7034209566', '2003-11-05', NULL, 'Male', 'Asian/Pacific Islander', 'Virginia Tech', '2025-05-12', 'Industrial and Systems Engineering', NULL, NULL, '2025-1-1', NULL);

-- Filler candidate insertions
INSERT INTO candidate (first_name, last_name, email, phone_number, date_of_birth, info, gender, ethnicity, school_name, graduation_date, field_of_study, website, resume_file, account_created, profile_picture) VALUES
('John', 'Doe', 'john.doe@example.com', '1234567890', '1990-05-15', 'Experienced software engineer specializing in backend development.', 'Male', 'White/Caucasian', 'Harvard University', '2012-06-30', 'Computer Science', 'http://www.johndoe.com', NULL, '2024-04-03', NULL),
('Jane', 'Smith', 'jane.smith@example.com', '1987654321', '1992-09-20', 'Recent graduate with a passion for data analysis and visualization.', 'Female', 'Black or African American', 'Stanford University', '2023-05-25', 'Data Science', 'http://www.janesmith.com', NULL, '2024-04-03', NULL),
('David', 'Brown', 'david.brown@example.com', '1122334455', '1991-03-10', 'Seasoned marketing professional with expertise in digital marketing strategies.', 'Male', 'Hispanic', 'MIT', '2013-08-15', 'Marketing', 'http://www.davidbrown.com', NULL, '2024-04-03', NULL),
('Emily', 'Johnson', 'emily.johnson@example.com', '5550998877', '1993-11-28', 'Skilled graphic designer with a keen eye for detail and creativity.', 'Female', 'Asian/Pacific Islander', 'Pratt Institute', '2020-12-20', 'Graphic Design', 'http://www.emilyjohnson.com', NULL, '2024-04-03', NULL),
('Michael', 'Williams', 'michael.williams@example.com', '6665557777', '1990-07-04', 'Seasoned project manager adept at leading cross-functional teams to success.', 'Male', 'White/Caucasian', 'Stanford University', '2012-05-30', 'Business Administration', 'http://www.michaelwilliams.com', NULL, '2024-04-03', NULL),
('Sarah', 'Martinez', 'sarah.martinez@example.com', '4444777666', '1992-02-18', 'Energetic sales professional with a proven track record of exceeding targets.', 'Female', 'Hispanic', 'University of California, Berkeley', '2014-07-10', 'Sales', 'http://www.sarahmartinez.com', NULL, '2024-04-03', NULL),
('Matthew', 'Nguyen', 'matthew.nguyen@example.com', '7778889999', '1991-08-12', 'Highly motivated mechanical engineer with a focus on sustainable design.', 'Male', 'Asian/Pacific Islander', 'Massachusetts Institute of Technology', '2013-06-15', 'Mechanical Engineering', 'http://www.matthewnguyen.com', NULL, '2024-04-03', NULL),
('Emma', 'Garcia', 'emma.garcia@example.com', '2233445566', '1993-04-30', 'Creative fashion designer with a flair for innovative designs.', 'Female', 'Hispanic', 'Parsons School of Design', '2015-05-20', 'Fashion Design', 'http://www.emmagarcia.com', NULL, '2024-04-03', NULL),
('William', 'Chen', 'william.chen@example.com', '3332221111', '1990-12-08', 'Experienced financial analyst with expertise in risk management.', 'Male', 'Asian/Pacific Islander', 'University of Pennsylvania', '2012-08-30', 'Finance', 'http://www.williamchen.com', NULL, '2024-04-03', NULL),
('Olivia', 'Taylor', 'olivia.taylor@example.com', '8887776655', '1992-01-25', 'Passionate educator dedicated to fostering a love for learning in students.', 'Female', 'White/Caucasian', 'Harvard University', '2014-06-28', 'Education', 'http://www.oliviataylor.com', NULL, '2024-04-03', NULL),
('James', 'Rodriguez', 'james.rodriguez@example.com', '9997775544', '1991-06-03', 'Dynamic software developer with expertise in full-stack web development.', 'Male', 'Hispanic', 'Stanford University', '2013-09-15', 'Computer Science', 'http://www.jamesrodriguez.com', NULL, '2024-04-03', NULL),
('Ava', 'Lopez', 'ava.lopez@example.com', '6668884444', '1993-03-22', 'Skilled journalist with a passion for investigative reporting.', 'Female', 'Hispanic', 'Columbia University', '2015-07-20', 'Journalism', 'http://www.avalopez.com', NULL, '2024-04-03', NULL),
('Daniel', 'Lee', 'daniel.lee@example.com', '5554446699', '1990-10-17', 'Experienced accountant with a strong background in auditing and financial analysis.', 'Male', 'Asian/Pacific Islander', 'University of California, Los Angeles', '2012-05-30', 'Accounting', 'http://www.daniellee.com', NULL, '2024-04-03', NULL),
('Sophia', 'Jackson', 'sophia.jackson@example.com', '2229998888', '1992-07-14', 'Dedicated social worker committed to advocating for marginalized communities.', 'Female', 'Black or African American', 'University of Michigan', '2014-08-25', 'Social Work', 'http://www.sophiajackson.com', NULL, '2024-04-03', NULL),
('Ethan', 'Hernandez', 'ethan.hernandez@example.com', '9994443322', '1991-04-05', 'Innovative product manager skilled in product development and launch strategies.', 'Male', 'Hispanic', 'University of Southern California', '2013-10-10', 'Product Management', 'http://www.ethanhernandez.com', NULL, '2024-04-03', NULL);

-- Filler employer insertions
INSERT INTO employer (first_name, last_name, email, company_name, info, profile_picture) VALUES
('John', 'Doe', 'john.doe@example.com', 'ABC Company', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', NULL),
('Jane', 'Smith', 'jane.smith@example.com', 'XYZ Corporation', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', NULL),
('Michael', 'Johnson', 'michael.johnson@example.com', '123 Industries', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', NULL),
('Emily', 'Williams', 'emily.williams@example.com', 'Tech Innovations Ltd.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', NULL),
('David', 'Brown', 'david.brown@example.com', 'Global Solutions Inc.', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL),
('Sarah', 'Davis', 'sarah.davis@example.com', 'Sunset Enterprises', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', NULL),
('Christopher', 'Miller', 'christopher.miller@example.com', 'Peak Performance Group', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', NULL),
('Jessica', 'Wilson', 'jessica.wilson@example.com', 'Future Innovations LLC', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', NULL),
('Matthew', 'Moore', 'matthew.moore@example.com', 'Dynamic Solutions Co.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', NULL),
('Amanda', 'Taylor', 'amanda.taylor@example.com', 'Innovative Technologies', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL),
('James', 'Anderson', 'james.anderson@example.com', 'Visionary Ventures', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', NULL),
('Melissa', 'Martinez', 'melissa.martinez@example.com', 'Pioneer Enterprises', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', NULL),
('Daniel', 'Hernandez', 'daniel.hernandez@example.com', 'Dynamic Innovations Inc.', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', NULL),
('Jennifer', 'Garcia', 'jennifer.garcia@example.com', 'Innovative Solutions Ltd.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', NULL),
('Ryan', 'Lopez', 'ryan.lopez@example.com', 'Future Trends Group', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL),
('Ashley', 'Gonzalez', 'ashley.gonzalez@example.com', 'Tech Savvy Inc.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', NULL),
('Joshua', 'Wilson', 'joshua.wilson@example.com', 'Innovative Solutions Co.', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', NULL),
('Rebecca', 'Rivera', 'rebecca.rivera@example.com', 'Advanced Technologies Ltd.', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', NULL),
('Justin', 'Lee', 'justin.lee@example.com', 'Future Dynamics Inc.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', NULL),
('Laura', 'Walker', 'laura.walker@example.com', 'Tech Genius Group', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL);

-- Inserting programming languages
INSERT INTO skill (skill_name) VALUES
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

-- Inserting Computer Science skills
INSERT INTO skill (skill_name) VALUES
('Algorithm Design and Analysis'),
('Data Structures'),
('Computer Programming'),
('Software Engineering'),
('Operating Systems'),
('Database Management'),
('Computer Graphics'),
('Artificial Intelligence'),
('Machine Learning'),
('Computer Vision'),
('Natural Language Processing'),
('Web Development'),
('Mobile App Development'),
('Cloud Computing'),
('Parallel Computing'),
('Computer Networks'),
('Cryptography'),
('Blockchain Technology'),
('Computer Security'),
('Distributed Systems');

-- Inserting Computational Modeling and Data Analytics skills
INSERT INTO skill (skill_name) VALUES
('Statistics'),
('Mathematical Modeling'),
('Data Mining'),
('Machine Learning Algorithms'),
('Predictive Analytics'),
('Data Visualization'),
('Big Data Analytics'),
('Time Series Analysis'),
('Optimization Techniques'),
('Computational Fluid Dynamics'),
('Finite Element Analysis'),
('Geospatial Analysis'),
('Text Mining'),
('Social Network Analysis'),
('Image Processing'),
('Deep Learning'),
('Reinforcement Learning'),
('Quantitative Analysis'),
('Business Intelligence'),
('Data Warehousing');

-- Inserting Network Engineering skills
INSERT INTO skill (skill_name) VALUES
('Network Protocols'),
('TCP/IP Networking'),
('Routing and Switching'),
('Network Security'),
('Firewall Configuration'),
('Wireless Networking'),
('Network Performance Optimization'),
('Quality of Service (QoS)'),
('Software-Defined Networking (SDN)'),
('Network Monitoring'),
('LAN/WAN Configuration'),
('Virtual Private Networks (VPNs)'),
('Network Troubleshooting'),
('Internet of Things (IoT)'),
('Cloud Networking'),
('Voice over IP (VoIP)'),
('Network Design'),
('Network Automation'),
('Network Administration'),
('Load Balancing');

-- Inserting Cyber Security skills
INSERT INTO skill (skill_name) VALUES
('Ethical Hacking'),
('Penetration Testing'),
('Vulnerability Assessment'),
('Intrusion Detection and Prevention'),
('Incident Response'),
('Security Information and Event Management (SIEM)'),
('Digital Forensics'),
('Malware Analysis'),
('Web Application Security'),
('Network Security Monitoring'),
('Security Compliance'),
('Identity and Access Management (IAM)'),
('Security Risk Assessment'),
('Encryption Techniques'),
('Secure Coding Practices'),
('Cyber Threat Intelligence'),
('Security Operations Center (SOC)'),
('Cloud Security'),
('Endpoint Security'),
('Security Awareness Training');

-- Inserting DevOps skills
INSERT INTO skill (skill_name) VALUES
('Continuous Integration (CI)'),
('Continuous Deployment (CD)'),
('Infrastructure as Code (IaC)'),
('Configuration Management'),
('Containerization'),
('Orchestration Tools'),
('Microservices Architecture'),
('Monitoring and Logging'),
('Automated Testing'),
('Version Control'),
('Release Management'),
('Deployment Automation'),
('Container Orchestration'),
('Site Reliability Engineering (SRE)'),
('DevSecOps'),
('Cloud Infrastructure Management'),
('Agile Methodologies'),
('Collaboration Tools'),
('GitOps'),
('CI/CD Pipelines');

INSERT INTO candidate_skill VALUES
(1, 1), (1, 2), (1, 3), (1, 5), (1, 6), (1, 15), (1, 19), (1, 21), (1, 22), (1, 23), (1, 24), (1, 25), (1, 26), (1, 28), (1, 29), (1, 32), (1, 37), (1, 41), (1, 44), (1, 65), (1, 110),
(2, 1), (2, 2), (2, 3), (2, 7), (2, 15), (2, 21), (2, 22), (2, 24), (2, 29), (2, 30), (2, 35), (2, 41), (2, 48), (2, 49), (2, 56), (2, 57), (2, 110),
(4, 1), (4, 2), (4, 3), (4, 6), (4, 7), (4, 15), (4, 16), (4, 22), (4, 32), (4, 35), (4, 41), (4, 42), (4, 45), (4, 46),
(5, 2), (5, 6), (5, 12), (5, 15), (5, 16), (5, 22), (5, 26), (5, 27), (5, 41), (5, 48), (5, 63);
