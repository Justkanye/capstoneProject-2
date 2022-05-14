const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const User = require('../models/user.model');

function validateToken(req, res, next) {
	//get token from request header
	const authHeader = req.headers["authorization"];
	if (!authHeader) {
		res.status(400).send({ status: "error", error: "Authorization header is empty" });
		return;
	}
	const token = authHeader && authHeader.split(" ")[1];
	//the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
	if (!token) {
		res.status(400).send({ status: "error", error: "Token not present" });
		return;
	}
	try {
		jwt.verify(token, JWT_SECRET_KEY, (err, tokenData) => {
			if (err) { 
			 	res.status(403).send({ status: "error", error: "Invalid token" });
			 	return;
			 }
			 else {
			 	User.findById(tokenData.id, (error, data)=> {
			 		if (error) {
			 			res.status(500).send({ status: "error", error: error.message || "Unable to get user"});
			 			return;
			 		} else {
			 			req.user = data.data;
			 			next();
			 		}
			 	});
		 	}
		});
	} catch (validateError) {
		console.log(validateError);
	}
};

module.exports = validateToken;