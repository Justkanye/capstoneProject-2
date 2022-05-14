const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const { findById } = require('../models/user.model')
const generate = (id) => {
    if (!id) return null;
    return jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '1d'});
}

const decode = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    generate,
    decode,
}