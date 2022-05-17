const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        first_name: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        last_name: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        email: Joi.string()
            .trim()
            .email({ minDomainSegments: 2 })
            .required(),
        password: Joi.string().required()
            .pattern(new RegExp('^[\w@-]{8,20}$')),
        phone_number: Joi.string().min(10).max(15).required()
            .pattern(new RegExp('^[+]?\d{10,15}$')),
        address: Joi.string()
            .trim()
            .alphanum()
            .min(10)
            .max(255)
            .required(),
        is_admin: Joi.boolean()
    });
    validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
    const schema = Joi.object().keys({
        phone_number: Joi.string().min(10).max(15)
            .pattern(new RegExp('^[+]?\d{10,15}$')),
        email: Joi.string()
            .trim()
            .email(),
        password: Joi.string()
            .pattern(new RegExp('^[\w@-]{8,20}$'))
    }).or('phone_number', 'email')
    validatorHandler(req, res, next, schema);
};

module.exports = {
    signup,
    signin
};