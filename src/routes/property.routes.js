const router = require('express').Router();
const propertyController = require('../controllers/property.controller');
const validateToken = require('../middlewares/validateToken');
const isPropertyOwner = require('../middlewares/isPropertyOwner');

module.exports = app => {
	// get all properties
	router.get('/', propertyController.getAll);

	// get property by id
	router.get('/:propertyId', propertyController.getById);

	router.get('/search', validateToken, propertyController.create);

	// create a new property
	router.post('/', validateToken, propertyController.create);

	// update a property
	router.patch('/:propertyId', validateToken, isPropertyOwner, propertyController.update);

	// update a property's status to sold
	router.patch('/:propertyId/sold', validateToken, isPropertyOwner, propertyController.updateStatus);

	router.delete('/:propertyId', validateToken, isPropertyOwner, propertyController.create);

	app.use('/api/v1/property', router);
};
