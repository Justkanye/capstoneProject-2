const router = require('express').Router();
const userController = require('../controllers/user.controller');

module.exports = app => {

	// user sign up
	router.post("/signup", userController.signUp);

	// user sign in
	router.post("/signin", userController.signIn);

	// password reset
	router.post("/reset-password", userController.resetPassword);

	app.use('/api/v1/auth', router);

};
