const db = require('../config/db.config');
require('../database/scripts/propertyTableUp');
const { createNewProperty, getByIdentifier, updatePropertyQuery, deletePropertyQuery, updatePropertyStatusQuery } = require('../database/queries');

//Constructor
class Property{
	constructor( owner, price, state, city, address, type, image_url){
		this.owner = owner;
		this.price = price;
		this.state = state;
		this.city = city;
		this.address = address;
		this.type = type;
		this.image_url = image_url;
	}

	//create
	static create(newProperty, result) {
		db.query(createNewProperty, [newProperty.owner, newProperty.price, newProperty.state, newProperty.city, newProperty.address, newProperty.type, newProperty.image_url], (err, res) => {
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
		db.query(updatePropertyQuery, [property.price, property.state, property.city, property.address, property.type, id], (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			};
			this.findById(id, result);
		});
	};

	//update status
	static updatePropertyStatusById(id, result) {
		db.query(updatePropertyStatusQuery, [id], (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			};
			this.findById(id, result);
		});
	};

	//delete
	static deletePropertyById(id, result) {
		db.query(deletePropertyQuery, [id], (err, res) => {
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
		db.query(getByIdentifier('properties'), (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message || err);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			}
			console.log(`Found ${res.length} properties`);;
			result(null, { status: "success", data: res });
			return;	
		});
	};

	//find by type
	static findByType(type, result) {
		db.query(getByIdentifier('properties', 'type'),[type], (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message || err);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			}

			console.log(`Found ${res.length} properties`);
			result(null, { status: "success", data: res });
			return;	
		});
	};

	//find by id
	static findById(id, result) {
		db.query(getByIdentifier('properties', 'id'),[id], (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message || err);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			}
			if (res[0]) {
				console.log('Found property: ', res[0]);
				result(null, { status: "success", data: res[0] });
				return;
			}

			// not found	
			result({ kind:"not found" }, null);
			return;
		});
	};

	// find by user
	static findPropertyByOwner(owner, result) {
		db.query(getByIdentifier('properties', 'owner'),[owner], (err, res) => {
			if (err) {
				console.log('Error: ', err.sqlMessage || err.message || err);
				result({ status: "error", message: err.sqlMessage || err.message }, null);
				return;
			}
			if (res) {
				console.log(`Found ${res.length} properties`);
				result(null, { status: "success", data: res });
				return;
			}

			// not found	
			result({ kind:"not found" }, null);
			return;
		});
	};
};

module.exports = Property;