const userRepository = require('../repositories/userRepository');
const userSchema = require('../models/userSchema');

async function create(req, res) {
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await userRepository.create(value);
  res.status(201).json(user);
}

async function getAll(req, res) {
  const users = await userRepository.getAll();
  res.json(users);
}

async function getById(req, res) {
  const user = await userRepository.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
}

async function update(req, res) {
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await userRepository.update(req.params.id, value);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
}

async function deleteUser(req, res) {
  const user = await userRepository.delete(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteUser
};
