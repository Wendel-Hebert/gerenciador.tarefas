const taskRepository = require('../repositories/taskRepository');
const taskSchema = require('../models/taskSchema');

async function create(req, res) {
  const { error, value } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const task = await taskRepository.create(value);
    return res.status(201).json(task);
  } catch (err) {
    console.error('Erro ao criar task:', err);
    return res.status(500).json({ error: 'Erro interno ao criar tarefa.' });
  }
}

async function getAll(req, res) {
  try {
    const tasks = await taskRepository.getAll();
    return res.json(tasks);
  } catch (err) {
    console.error('Erro ao listar tasks:', err);
    return res.status(500).json({ error: 'Erro interno ao listar tarefas.' });
  }
}

async function getById(req, res) {
  try {
    const task = await taskRepository.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    return res.json(task);
  } catch (err) {
    console.error('Erro ao buscar task por ID:', err);
    return res.status(500).json({ error: 'Erro interno ao buscar tarefa.' });
  }
}

async function update(req, res) {
  const { error, value } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const task = await taskRepository.update(req.params.id, value);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    return res.json(task);
  } catch (err) {
    console.error('Erro ao atualizar task:', err);
    return res.status(500).json({ error: 'Erro interno ao atualizar tarefa.' });
  }
}

async function deleteTask(req, res) {
  try {
    const task = await taskRepository.delete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
    return res.json(task);
  } catch (err) {
    console.error('Erro ao deletar task:', err);
    return res.status(500).json({ error: 'Erro interno ao deletar tarefa.' });
  }
}


module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteTask
};
