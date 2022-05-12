const db = require('../config/db.config');

// create properties table if it does not exist
const createPropertiesTableCommand = `CREATE TABLE IF NOT EXISTS properties(id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, owner INT NOT NULL, FOREIGN KEY (owner) REFERENCES users(id), status ENUM('sold', 'available') NOT NULL DEFAULT 'available', price FLOAT NOT NULL, state VARCHAR(255)NOT NULL, city VARCHAR(255) NOT NULL, address VARCHAR(255)NOT NULL, type VARCHAR(255)NOT NULL, image_url VARCHAR(255)NOT NULL, created_on DATETIME DEFAULT CURRENT_TIMESTAMP)`;
db.query(createPropertiesTableCommand, function (err, res) {
	if (err) {
		console.log('An error occured while trying to create properties table: ', err.sqlMessage || err.message || err);
		return;
	}
	if (!res.warningCount) console.log('Properties table successfully created.');
});

//Constructor
class Property{
	constructor( owner, status, price, state, city, address, type, image_url){
		this.owner = owner;
		this.status = status;
		this.price = price;
		this.state = state;
		this.city = city;
		this.address = address;
		this.type = type;
		this.image_url = image_url;
	}

	//create
	static create(newProperty, result) {
		db.query(`INSERT INTO properties(owner, price, state, city, address, type, image_url) VALUES(?,?,?,?,?,?,?)`, [newProperty.owner, newProperty.price, newProperty.state, newProperty.city, newProperty.address, newProperty.type, newProperty.image_url], (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			}
			console.log("New property created successfully!");
			this.findById(res.insertId, result);
		})
	}

	//update
	static updatePropertyById(id, property, result) {
		db.query(`UPDATE properties SET status = ?, price = ?, state = ?, city = ?, address = ?, type = ? WHERE id = ?`, [property.status, property.price, property.state, property.city, property.address, property.type, id], (err, res) => {
			console.log(res);
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			};
			if (res.length) {
				console.log('Found property: ', res[0]);
				result(null, { status: "success", data: res[0] });
				return;	
			};

			// not found
			result({ status: "error", message: "Not found" }, null );
		});
	};
	//delete
	static deletePropertyById(id, result) {
		db.query(`DELETE FROM properties WHERE id = ?`, [id], (err, res) => {
			console.log(res);
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			}

			result(null, { status: "success", data: res});
		});
	};
	//get all
	static getAll(result) {
		db.query(`SELECT * FROM properties`, (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message || err);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			}
			console.log('Found properties: ', res);
			result(null, { status: "success", data: res });
			return;	
		})
	}
	//find by type
	static findByType(type, result) {
		db.query(`SELECT * FROM properties WHERE type = ?`,[type], (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message || err);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			}

			console.log('Found properties: ', res);
			result(null, { status: "success", data: res });
			return;	
		})
	}
	//find by id
	static findById(id, result) {
		db.query(`SELECT * FROM properties WHERE id = ?`,[id], (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message || err);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			}

			console.log('Found property: ', res[0]);
			result(null, { status: "success", data: res[0]});
			return;	
		})
	}
}

module.exports = Property;