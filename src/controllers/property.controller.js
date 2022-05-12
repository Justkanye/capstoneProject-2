const Property = require('../models/property.model');

// Create and save a new property
exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			status: "error",
			message: "Content cannot be empty!"
		});
	};
	const { status, price, state, city, address, type, image_url } = req.body;
	const newProperty = new Property ( 9, status, price, state, city, address, type, image_url);

	Property.create(newProperty, (err, data) => {
		if (err) {
			res.status(500).send({
				status: "error",
				error: err.sqlMessage || err.message || err|| "Some error occured"
			});
		} else {
			res.send(data);
	}
});
};
// Retrieve all properties from database

// Find a single property by id

// Find all properties of specific type

// Update a property identified by id in the request

// Delete a property identified by id in the request

// Find all properties of created by a specific user (optional)