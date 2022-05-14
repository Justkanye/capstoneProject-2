const Property = require('../models/property.model');

// Create and save a new property
exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			status: "error",
			message: "Content cannot be empty!"
		});
	};
	const { price, state, city, address, type, image_url } = req.body;
	const newProperty = new Property ( req.user.id, price, state, city, address, type, image_url);

	Property.create(newProperty, (err, data) => {
		if (err) {
			res.status(500).send({
				status: "error",
				error: err.message || "Unable to create property"
			});
		} else {
			res.send(data);
	}
});
};

// Retrieve all properties from database
exports.getAll = (req, res) => {
	Property.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				status: "error",
				error: err.message || "Unable to fetch properties"
			});
		} else {
			res.send(data);
		}
	});
};

// Find a single property by id
exports.getById = (req, res) => {
	const propertyId = req.params.propertyId;
	Property.findById(propertyId,(err, data) => {
			if (err) {
				res.status(500).send({
					status: "error",
					error: err.message || "Unable to find property"
				});
			} else {
			res.send(data);
		}
	});
};

// Find all properties of specific type

// Update a property identified by id in the request
exports.update = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			status: "error",
			message: "Content cannot be empty!"
		});
	};
	const propertyId = req.params.propertyId;
	const { price, state, city, address, type, image_url } = req.body;
	const newProperty = new Property ( req.user.id, price, state, city, address, type, image_url);
	Property.updatePropertyById(propertyId, newProperty, (err, data) => {
		if (err) {
			res.status(500).send({
				status: "error",
				error: err.message || "Unable to update property"
			});
		} else {
			res.send(data);
		}
	});
};

// update property status
exports.updateStatus = (req, res) => {
	const propertyId = req.params.propertyId;
	Property.updatePropertyStatusById(propertyId, (err, data) => {
		if (err) {
			res.status(500).send({
				status: "error",
				error: err.message || "Unable to update property"
			});
		} else {
			res.send(data);
		}
	});
};

// Delete a property identified by id in the request
exports.delete = (req, res) => {
	const propertyId = req.params.propertyId;
	Property.deletePropertyById(propertyId,(err, data) => {
			if (err) {
				res.status(500).send({
					status: "error",
					error: err.message || "Unable to delete property"
				});
			} else {
			res.send(data);
		}
	});
};

// Find all properties of created by a specific user (optional)