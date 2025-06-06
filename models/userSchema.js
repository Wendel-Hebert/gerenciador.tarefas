const Joi = require('joi');

const userSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  created_at: Joi.date().optional()
});

module.exports = userSchema;
