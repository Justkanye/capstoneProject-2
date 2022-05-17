const { DB_NAME } = require('../utils/secrets');

// create database
const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

// delete database
const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

// create user table if it does not exist
const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	phone_number VARCHAR(15)NOT NULL UNIQUE,
	address VARCHAR(255) NOT NULL,
	is_admin BOOLEAN DEFAULT false
)
`;

// create properties table if it does not exist
const createPropertyTableQuery = `
CREATE TABLE IF NOT EXISTS properties(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
	owner INT NOT NULL, FOREIGN KEY (owner) REFERENCES users(id),
	status ENUM('sold', 'available') NOT NULL DEFAULT 'available',
	price FLOAT NOT NULL, state VARCHAR(255)NOT NULL, city VARCHAR(255) NOT NULL,
	address VARCHAR(255)NOT NULL, type VARCHAR(255)NOT NULL,
	image_url VARCHAR(255)NOT NULL,
	created_on DATETIME DEFAULT CURRENT_TIMESTAMP
)
`;

// create new user
const createNewUser = `INSERT INTO users VALUES(0,?,?,?,?,?,?,?)`;

// create new property
const createNewProperty = `INSERT INTO properties(owner, price, state, city, address, type, image_url) VALUES(?,?,?,?,?,?,?)`;

// update property by id
const updatePropertyQuery = `UPDATE properties SET price = ?, state = ?, city = ?, address = ?, type = ? WHERE id = ?`;

// update property status by id
const updatePropertyStatusQuery = `UPDATE properties SET status = "sold" WHERE id = ?`;

// delete property by id
const deletePropertyQuery = `DELETE FROM properties WHERE id = ?`; 

// get by identifier
const getByIdentifier = (table, identifier = null) => {
	if (identifier) {
		return `SELECT * FROM ${table} WHERE ${identifier} = ?`;
	} else {
		return `SELECT * FROM ${table}`;
	}
}

module.exports = {
    createDB,
    dropDB,
    createUserTableQuery,
    createPropertyTableQuery,
    createNewUser,
    createNewProperty,
    updatePropertyQuery,
    deletePropertyQuery,
    updatePropertyStatusQuery,
    getByIdentifier
};