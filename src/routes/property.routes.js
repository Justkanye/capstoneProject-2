const router = require('express').Router();
const propertyController = require('../controllers/property.controller');

module.exports = app => {
	router.post('/create', propertyController.create);

	app.use('/api/v1/property', router);
};
