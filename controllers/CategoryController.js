const categoryRepository = require('../repositories/categoryRepository');
const categorySchema = require('../models/categorySchema');

async function create(req, res) {
  const { error, value } = categorySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const category = await categoryRepository.create(value);
  res.status(201).json(category);
}

async function getAll(req, res) {
  const categories = await categoryRepository.getAll();
  res.json(categories);
}

async function getById(req, res) {
  const category = await categoryRepository.findById(req.params.id);
  if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });
  res.json(category);
}

async function update(req, res) {
  const { error, value } = categorySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const category = await categoryRepository.update(req.params.id, value);
  if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });
  res.json(category);
}

async function deleteCategory(req, res) {
  const category = await categoryRepository.delete(req.params.id);
  if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });
  res.json(category);
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteCategory
};
