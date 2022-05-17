const Joi = require("joi");
const validatorHandler = require("../middlewares/validatorHandler");

const signup = (req, res, next) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().trim().alphanum().min(3).max(50).required(),
    last_name: Joi.string().trim().alphanum().min(3).max(50).required(),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9@-]{8,20}$"))
      .required(),
    phone_number: Joi.string()
      .min(10)
      .max(15)
      .pattern(new RegExp("^[+]?[0-9]{10,15}$"))
      .required(),
    address: Joi.string().trim().min(10).max(255).required(),
    is_admin: Joi.boolean(),
  });
  validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
  const schema = Joi.alternatives().try(
    Joi.object().keys({
      phone_number: Joi.string().allow(""),
      email: Joi.string().trim().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9@-]{8,20}$"))
        .required(),
    }),
    Joi.object().keys({
      phone_number: Joi.string()
        .min(10)
        .max(15)
        .pattern(new RegExp("^[+]?[0-9]{10,15}$"))
        .required(),
      email: Joi.string().allow(""),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9@-]{8,20}$"))
        .required(),
    })
  );
  validatorHandler(req, res, next, schema);
};

const resetPassword = (req, res, next) => {
  const schema = Joi.alternatives().try(
    Joi.object().keys({
      phone_number: Joi.string().allow(""),
      email: Joi.string().trim().email().required(),
      current_password: Joi.string().required(),
      new_password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9@-]{8,20}$"))
        .required(),
    }),
    Joi.object().keys({
      phone_number: Joi.string()
        .min(10)
        .max(15)
        .pattern(new RegExp("^[+]?[0-9]{10,15}$"))
        .required(),
      email: Joi.string().allow(""),
      current_password: Joi.string().required(),
      new_password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9@-]{8,20}$"))
        .required(),
    })
  );
  validatorHandler(req, res, next, schema);
};

const update = (req, res, next) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().trim().alphanum().min(3).max(50).required(),
    last_name: Joi.string().trim().alphanum().min(3).max(50).required(),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
    phone_number: Joi.string()
      .min(10)
      .max(15)
      .pattern(new RegExp("^[+]?[0-9]{10,15}$"))
      .required(),
    address: Joi.string().trim().min(10).max(255).required(),
  });
  validatorHandler(req, res, next, schema);
};

module.exports = {
  signup,
  signin,
  resetPassword,
  update,
};
