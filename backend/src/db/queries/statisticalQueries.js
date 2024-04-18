const connection = require('../config/connection');

function getGenderDistribution() {
    connection.query('SELECT gender, COUNT(*) AS count FROM candidate GROUP BY gender;', (err, res) => {
        if (err) {
            console.error('Error fetching gender distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    })
}

function getEthnicityDistribution() {
    connection.query('SELECT ethnicity, COUNT(*) AS count FROM candidate GROUP BY ethnicity;', (err, res) => {
        if (err) {
            console.error('Error fetching gender distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

function getDateOfBirthDistribution() {
    connection.query('SELECT YEAR(CURDATE()) - YEAR(date_of_birth) - (RIGHT(CURDATE(), 5) < RIGHT(date_of_birth, 5)) AS age, COUNT(*) AS count FROM candidate GROUP BY age;', (err, res) => {
        if (err) {
            console.error('Error fetching date of birth distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

function getSkillDistribution() {
    connection.query('SELECT skill_name, COUNT(*) AS count FROM candidate_skill cs JOIN skill s ON cs.skill_id = s.skill_id GROUP BY skill_name;', (err, res) => {
        if (err) {
            console.error('Error fetching skill distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

function getCompanyDistribution() {
    connection.query('SELECT company_name, COUNT(*) AS count FROM employer GROUP BY company_name;', (err, res) => {
        if (err) {
            console.error('Error fetching company distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}

function getUserTypeDistribution() {
    connection.query('SELECT user_type, COUNT(*) AS count FROM authentication GROUP BY user_type;', (err, res) => {
        if (err) {
            console.error('Error fetching user type distribution: ', err);
            return callback(err, null);
        }
        return callback(null, res);
    });
}
