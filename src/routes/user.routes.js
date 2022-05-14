const router = require('express').Router();
const userController = require('../controllers/user.controller');
const validateToken = require('../middlewares/validateToken');

module.exports = app => {

	// user sign up
	router.route("/signup").post( userController.signUp);

	// user sign in
	router.post("/signin", userController.signIn);

	// password reset
	router.route("/reset-password").patch(validateToken, userController.resetPassword);

	app.use('/api/v1/auth', router);

};
