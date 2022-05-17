const Joi = require("joi");
const validatorHandler = require("../middlewares/validatorHandler");

const create = (req, res, next) => {
  const schema = Joi.object().keys({
    price: Joi.number().required(),
    state: Joi.string().min(10).max(50).required(),
    city: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(10).max(255).required(),
    type: Joi.string().min(4).max(50).required(),
  });
  validatorHandler(req, res, next, schema);
};

const update = (req, res, next) => {
  const schema = Joi.object().keys({
    price: Joi.number().required(),
    state: Joi.string().min(10).max(50).required(),
    city: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(10).max(255).required(),
    type: Joi.string().min(4).max(50).required(),
  });
  validatorHandler(req, res, next, schema);
};

module.exports = {
  create,
  update,
};
