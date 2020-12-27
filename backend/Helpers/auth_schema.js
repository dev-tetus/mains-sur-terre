const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().max(15).required(),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
});
const loginSchema = Joi.object({
  user: Joi.string().max(30).required(),
  password: Joi.string().max(60).required(),
});

module.exports = { registerSchema, loginSchema };
