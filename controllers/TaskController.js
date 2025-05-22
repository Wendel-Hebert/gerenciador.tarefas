// controllers/TaskController.js
const pool = require('../config/db.js');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  const query = 'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *'; // task singular
  const values = [title, description];

  try {
    const result = await pool.query(query, values);
    const task = result.rows[0];
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all tasks
exports.getAllTasks = async (req, res) => {
  const query = 'SELECT * FROM task'; // task singular

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM task WHERE id = $1'; // task singular
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const query = `
    UPDATE task SET title = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4 RETURNING *`; // task singular
  const values = [title, description, status, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM task WHERE id = $1 RETURNING *'; // task singular
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};