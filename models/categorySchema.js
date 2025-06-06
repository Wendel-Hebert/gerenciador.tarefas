const Joi = require('joi');

const categorySchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  name: Joi.string().max(100).required(),
  user_id: Joi.number().integer().positive().required(),
  created_at: Joi.date().optional()
});

module.exports = categorySchema;
