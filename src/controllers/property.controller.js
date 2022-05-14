const Property = require('../models/property.model');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// Create and save a new property
exports.create = async (req, res) => {
	if (!req.body) {
		res.status(400).send({
			status: "error",
			message: "Content cannot be empty!"
		});
	};
	try {
    // Upload image to cloudinary
    console.log('request.body: ',req.body);
    console.log('request.file: ',req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    const { price, state, city, address, type } = req.body;
	const newProperty = new Property ( req.user.id, price, state, city, address, type, result.secure_url);

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
  } catch (err) {
    console.log(err);
    res.status(500).send({
		status: "error",
		error: err.message || "Some error occured"
	});
  }
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
exports.getByType = (req, res) => {
	const type = req.query.type;
	Property.findByType(type,(err, data) => {
			if (err) {
				res.status(500).send({
					status: "error",
					error: err.message || "Unable to find properties"
				});
			} else {
			res.send(data);
		}
	});
};

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
	Property.findById(propertyId,(err, data) => {
			if (err) {
				if (err.kind) {
					res.status(404).send({
						status: "error",
						error: "Property not found"
					});
					return;
				} else {
					res.status(500).send({
						status:"error",
						error: err.message || "Unable to find property"
					});
					return;
				}
			} else {
				console.log('else block');
				Property.deletePropertyById(propertyId,(err2, data2) => {
						if (err2) {
							res.status(500).send({
								status: "error",
								error: err.message || "Unable to delete property"
							});
							return;
						} else {
						res.send(data);
					};
				});
			}
	});
};

// Find all properties of created by a specific user (optional)
exports.findByOwner = (req, res) => {
	const owner = req.params.userId;
	Property.findPropertyByOwner(owner,(err, data) => {
			if (err) {
				res.status(500).send({
					status: "error",
					error: err.message || `Unable to find properties by user with id ${owner}.`
				});
			} else {
				res.send(data);
			}
	});
};