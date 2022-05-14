const Property = require('../models/property.model');

const isPropertyOwner = (req, res, next) => {
	const userId = req.user.id;
	const propertyId = req.params.propertyId;
	Property.findById(propertyId,(err, data) => {
			if (err) {
				if (err.kind) {
					res.status(404).send({
						status: "error",
						error: "Property not found"
					});
					return;
				}
				res.status(500).send({
					status: "error",
					error: err.message || "Unable to find property"
				});
				return;
			} else if (data.data.owner != userId) {
				res.status(403).send({
					status: "error",
					error: "You are not authorized to modify this property"
				});
				return;
			} else {
				next();
			}
		});
};

module.exports = isPropertyOwner;