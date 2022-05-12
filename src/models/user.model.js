const db = require('../config/db.config');

// create user table if it does not exist
const createUserTableCommand = `CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL, phone_number VARCHAR(15)NOT NULL UNIQUE, address VARCHAR(255) NOT NULL, is_admin BOOLEAN DEFAULT false)`;
db.query(createUserTableCommand, function (err, res) {
	if (err) {
		console.log('An error occured while trying to create users table: ',  err.sqlMessage || err.message || err);
		return;
	}
	if (!res.warningCount) console.log('Users table successfully created.');
});

//Constructor
class User{
	constructor( email, first_name, last_name, password, phone_number, address, is_admin){
		this.email = email;
		this.first_name = first_name;
		this.last_name = last_name;
		this.password = password;
		this.phone = phone_number;
		this.address = address;
		this.is_admin = is_admin;
	}

	// create
	static create(newUser, result) {
		db.query(`INSERT INTO users VALUES(0,?,?,?,?,?,?,?)`, [newUser.email, newUser.first_name, newUser.last_name, newUser.password, newUser.phone, newUser.address, newUser.is_admin || false], (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			}
			console.log("New user created successfully!");
			this.findById(res.insertId, result);
		})
	}

	// get all
	static getAll(result) {
		db.query(`SELECT * FROM users`, (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			}

			console.log('Found users: ', res);
			result(null, { status: "success", data: res});
			return;	
		})
	}

	// find by email
	static findByEmail(email, result) {
		db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			};
			if (res.length) {
				console.log('Found user: ', res[0]);
				result(null, { status: "success", data: res[0]});
				return;	
			};

			// not found
			result({ status: "error", message: "Not found" }, null );
		});
	};

	// find by phone_number
	static findByPhoneNumber(phone_number, result) {
		db.query(`SELECT * FROM users WHERE phone_number = ?`, [phone_number], (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			};
			if (res.length) {
				console.log('Found user: ', res[0]);
				result(null, res[0]);
				return;	
			};

			// not found
			result({ message: "Not found" }, null );
		});
	};

	// Password reset for user identified by email
	static updatePasswordByEmail(email, password, result) {
		db.query(`UPDATE users SET password = ? WHERE email = ?`, [password, email], (err, res) => {
			console.log(res);
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			};
			if (res.length) {
				console.log('Found user: ', res[0]);
				result(null, { status: "success", data: res[0]});
				return;	
			};

			// not found
			result({ message: "Not found" }, null );
		});
	};

	// Password reset for user identified by phone_number
	static updatePasswordByPhoneNumber(phone_number, password, result) {
		db.query(`UPDATE users SET password = ? WHERE phone_number = ?`, [password, phone_number], (err, res) => {
			console.log(res);
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			};
			if (res.length) {
				console.log('Found user: ', res[0]);
				result(null, { status: "success", data: res[0]});
				return;	
			};

			// not found
			result({ status: "error", message: "Not found" }, null );
			return;
		});
	};

	// find by id
	static findById(id, result) {
		db.query(`SELECT * FROM users WHERE id = ?`,[id], (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message || err);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			}

			console.log('Found user: ', res[0]);
			result(null, { status: "success", data: res[0]});
			return;	
		})
	}
};

module.exports = User;