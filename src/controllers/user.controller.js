const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

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
	const phoneNumberRegex = /^[+]?\d{10,15}?$/;
	const passwordRegex = /^[\w@-]{8,20}?$/;
	if (!emailRegex.test(email)) {
		res.status(400).send({
			status: "error",
			error: "Please enter a valid email address"
		});
	} else if (!passwordRegex.test(password.trim())) {
		res.status(400).send({
			status: "error",
			error: "Password must be 8-20 characters long"
		});
	} else if (!phoneNumberRegex.test(phone_number)) {
		res.status(400).send({
			status: "error",
			error: "Please enter a valid phone phone_number"
		});
	} else {

		// create a user
		const user = new User( email, first_name, last_name, hashedPassword, phone_number, address, is_admin);

		// save user to database
		User.create(user, (err, data) => {
			if (err) {
				res.status(500).send({
					status: "error",
					error: err.sqlMessage || err.message || err
				});
			} else {
				const token = generateToken(data.id);
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

	
	if (email && password) {
		User.findByEmail(email, (err, data)=> {
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
					error: err.sqlMessage || err.message || "Can't find user with these credentials"
				});
			} else if (!comparePassword(password.trim(), data.password)) {
				res.status(400).send({
					status: "error",
					error: "Invalid username or password"
				});
			} else {
				res.send(data);
			};
		});
	} else if (phone_number && password){
		User.findByPhoneNumber(phone_number, (err, data)=> {
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
					error: err.sqlMessage || err.message || "Can't find user with these credentials"
				});
			} else if (!comparePassword(password.trim(), data.password)) {
				res.status(400).send({
					status: "error",
					error: "Invalid username or password"
				});
				return;
			} else {
				res.send(data);
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
	if (!req.body) {
		res.status(400).send({
			status: "error",
			message: "Content cannot be empty!"
		});
	};

	const { email, current_password, new_password, phone_number } = req.body;

	
	if (email && current_password) {
		User.findByEmail(email, (err, data)=> {
			if (err) {
				res.status(500).send({
					status: "error",
					error: err.sqlMessage || err.message || "Can't find user with these credentials"
				});
			} else if (!bcrypt.compareSync(current_password, data.password)) {
				res.status(400).send({
					status: "error",
					error: "Invalid username or password"
				});
			} else {
				// update password

				// hash password
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(new_password, salt);
				User.updatePasswordByEmail(email, hash, (error, updatedData)=> {
					if (err) {
						res.status(500).send({
							status: "error",
							error: err.sqlMessage || err.message || "Could not update password"
						});
					} else {
						res.send(data);
					}
				});
			};
		});
	} else if (phone_number && current_password){
		User.findByPhoneNumber(phone_number, (err, data)=> {
			if (err) {
				res.status(500).send({
					status: "error",
					error: err.sqlMessage || err.message || "Can't find user with these credentials"
				});
			} else if (!bcrypt.compareSync(current_password, data.password)) {
				res.status(400).send({
					status: "error",
					error: "Invalid username or password"
				});
			} else {
				// update password

				// hash password
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(new_password, salt);
				User.updatePasswordByPhoneNumber(phone_number, (error, updatedData)=> {
					if (err) {
						res.status(500).send({
							status: "error",
							error: err.sqlMessage || err.message || "Could not update password"
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