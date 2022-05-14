const router = require('express').Router();
const propertyController = require('../controllers/property.controller');
const validateToken = require('../middlewares/validateToken');
const isPropertyOwner = require('../middlewares/isPropertyOwner');

module.exports = app => {
	// get all properties
	router.get('/', propertyController.getAll);

	// get properties by type
	router.get('/search', propertyController.getByType);

	// get properties by owner
	router.get('/owner/:userId', propertyController.findByOwner);

	// create a new property
	router.post('/', validateToken, propertyController.create);

	// update a property
	router.patch('/:propertyId', validateToken, isPropertyOwner, propertyController.update);

	// update a property's status to sold
	router.patch('/:propertyId/sold', validateToken, isPropertyOwner, propertyController.updateStatus);

	// delete property by id
	router.delete('/:propertyId', validateToken, isPropertyOwner, propertyController.delete);

	// get property by id
	router.get('/:propertyId', propertyController.getById);

	app.use('/api/v1/property', router);
};
