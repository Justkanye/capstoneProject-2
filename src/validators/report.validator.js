const Joi = require("joi");
const validatorHandler = require("../middlewares/validatorHandler");

const create = (req, res, next) => {
  const schema = Joi.object().keys({
    reason: Joi.string().trim().min(10).max(255).required(),
    description: Joi.string().trim().min(10).max(255).required(),
  });
  validatorHandler(req, res, next, schema);
};

module.exports = {
  create,
};
