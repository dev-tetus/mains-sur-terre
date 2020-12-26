const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().max(15).required(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),

});
module.exports = {registerSchema 
}