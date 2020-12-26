const Joi = require("joi");

const regexId = Joi.string().regex(/^\d+$/).required();

const updateProduct = Joi.object({
  name: Joi.string().min(3).max(30),
  description: Joi.string().min(5).max(500),
  price: Joi.number().greater(0),
});

const insertProduct = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(5).max(500).required(),
  price: Joi.number().greater(0).required(),
});

module.exports = {
  regexId,
  updateProduct,
  insertProduct,
};
