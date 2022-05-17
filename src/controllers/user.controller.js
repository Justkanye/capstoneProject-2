const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken, decode: decodeToken } = require('../utils/token');

// sign up and save a new user
exports.signUp = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			status: "error",
			message: "Content cannot be empty!"
		});
	};

	const { email, first_name, last_name, password, phone_number, address, is_admin } = req.body;
	const hashedPassword = hashPassword(password.trim());

	// validate user inputs
	const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
	const phoneNumberRegex = /^[+]?\d{10,15}$/;
	const passwordRegex = /^[\w@-]{8,20}?/;
	if (!emailRegex.test(email.trim())) {
		res.status(400).send({
			status: "error",
			error: "Please enter a valid email address"
		});
	} else if (!passwordRegex.test(password.trim())) {
		res.status(400).send({
			status: "error",
			error: "Password must be 8-20 characters long and without spaces"
		});
	} else if (!phoneNumberRegex.test(phone_number.trim())) {
		res.status(400).send({
			status: "error",
			error: "Please enter a valid phone phone_number"
		});
	} else {

		// create a user
		const user = new User( email.trim(), first_name.trim(), last_name.trim(), hashedPassword, phone_number.trim(), address.trim(), is_admin ? is_admin.trim() : false);

		// save user to database
		User.create(user, (err, data) => {
			if (err) {
				res.status(500).send({
					status: "error",
					error: err.message || err
				});
			} else {
				const token = generateToken(data.data.id);
	            res.status(201).send({
	                status: "success",
	                data: {
	                    token,
	                    ...data.data
	                }
	            });
			}
		});
	}
};

// Sign in an existing user
exports.signIn = (req, res)=> {
	if (!req.body) {
		res.status(400).send({
			status: "error",
			message: "Content cannot be empty!"
		});
	};

	const { email, password, phone_number } = req.body;

	
	if (email.trim() && password.trim()) {
		User.findByEmail(email.trim(), (err, data)=> {
			if (err) {
				if (err.kind === "not_found") {
	                res.status(404).send({
	                    status: 'error',
	                    message: `User with email ${email} was not found`
	                });
	                return;
	            }
				res.status(500).send({
					status: "error",
					error: err.message || "Can't find user with these credentials"
				});
			} else if (!comparePassword(password.trim(), data.data.password)) {
				res.status(401).send({
					status: "error",
					error: "Invalid email or password"
				});
			} else {
				const token = generateToken(data.data.id);
				if (!token) {
					res.status(500).send({
                    status: 'error',
	                    message: 'cannot generate token'
		            });
				}
				res.status(200).send({
                    status: 'success',
                    data: {
                    	token,
	                    ...data.data
	                }
	            });
			};
		});
	} else if (phone_number.trim() && password.trim()){
		User.findByPhoneNumber(phone_number.trim(), (err, data)=> {
			if (err) {
				if (err.kind === "not_found") {
	                res.status(404).send({
	                    status: 'error',
	                    message: `User with phone number ${phone_number} was not found`
	                });
	                return;
	            }
				res.status(500).send({
					status: "error",
					error: err.message || "Can't find user with these credentials"
				});
			} else if (!comparePassword(password.trim(), data.data.password)) {
				res.status(401).send({
					status: "error",
					error: "Invalid phone number or password"
				});
				return;
			} else {
				const token = generateToken(data.id);
				if (!token) {
					res.status(500).send({
                    	status: 'error',
	                    error: 'cannot generate token'
		            });
				}
				res.status(200).send({
                    status: 'success',
                    data: {
                    	token,
	                    ...data.data
	                }
	            });
			};
		});
	} else {
		res.status(400).send({
			status: "error",
			error: "Incomplete credentials!"
		});
	}

};

// Password reset for existing user
exports.resetPassword = (req, res)=> {
	const authHeader = req.headers["authorization"]
	const token = authHeader.split(" ")[1]
	if (!token) res.status(400).send({ status: "error", error:"Token not present" });
	if (!req.body) res.status(400).send({ status: "error", message: "Content cannot be empty!"});

	const { email, current_password, new_password, phone_number } = req.body;

	
	if (email.trim() && current_password.trim()) {
		User.findByEmail(email.trim(), (err, data)=> {
			if (err) {
				res.status(500).send({
					status: "error",
					error: err.message || "Can't find user with these credentials"
				});
			} else if (req.user.id !== data.data.id) {
				res.status(403).send("You are not authorized to make changes on this account!");
			} else if (!(comparePassword(current_password, data.data.password))) {
				res.status(400).send({
					status: "error",
					error: "Invalid email or password"
				});
			} else {
				// update password
				const hashedPassword = hashPassword(new_password.trim());
				User.updatePasswordByEmail(email.trim(), hashedPassword, (error, updatedData)=> {
					if (err) {
						res.status(500).send({
							status: "error",
							error: err.message || "Could not update password"
						});
					} else {
						res.send(data);
					}
				});
			};
		});
	} else if (phone_number.trim() && current_password.trim()){
		User.findByPhoneNumber(phone_number.trim(), (err, data)=> {
			if (err) {
				res.status(500).send({
					status: "error",
					error: err.message || "Can't find user with these credentials"
				});
			} else if (req.user.id !== data.data.id) {
				res.status(403).send("You are not authorized to make changes on this account!");
			} else if (!(comparePassword(current_password, data.data.password))) {
				res.status(400).send({
					status: "error",
					error: "Invalid phone number or password"
				});
			} else {
				// update password
				const hashedPassword = hashPassword(new_password.trim());;
				User.updatePasswordByPhoneNumber(phone_number.trim(), hashedPassword, (error, updatedData)=> {
					if (err) {
						res.status(500).send({
							status: "error",
							error: err.message || "Could not update password"
						});
					} else {
						res.send(data);
					}
				});
			};
		});
	} else {
		res.status(400).send({
			status: "error",
			error: "Incomplete credentials!"
		});
	}

};