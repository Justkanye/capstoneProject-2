const router = require('express').Router();
const userController = require('../controllers/user.controller');

module.exports = app => {
  // POST /auth/signup API Endpoint specification
  router.post('/signup', userController.create)


app.use('/auth', router)
};
