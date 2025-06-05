const Joi = require('joi');

const userSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(200).required(),
  created_at: Joi.date().optional()
});

module.exports = userSchema;
