const User = require('../models/user.model');
const { genSaltSync, hashSync } = require('bcrypt')

// Create and save a new user
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      status: "error",
      error: "Content cannot be empty!"
    })
  }
  
  const { id, email, first_name, last_name, password, phone_number, address, is_admin } = req.body
  const salt = genSaltSync(10)
  password = hashSync(password, salt)
  const user = new User(id, email, first_name, last_name, password, phone_number, address, is_admin)
  
  User.createUser(user, (err, data) => {
    if (err) {
      res.status(500).json({
        status: "error",
        error: err.message || "Same error occurred while creating the user"
      })
    }
    res.status(200).json({
      status: "success",
      data: data
    })
  })
}

// Retrieve all users from database

// Find a single User by id