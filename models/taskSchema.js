const Joi = require('joi');

const taskSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  title: Joi.string().max(150).required(),
  description: Joi.string().allow(null, '').optional(),
  status: Joi.string().valid('pending', 'in progress', 'done').required(),
  due_date: Joi.date().allow(null).optional(),
  user_id: Joi.number().integer().positive().required(),
  category_id: Joi.number().integer().positive().allow(null).optional(),
  created_at: Joi.date().optional()
});

module.exports = taskSchema;
