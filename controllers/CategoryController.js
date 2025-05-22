const pool = require('../config/db.js');

// Create a new category
exports.createCategory = async (req, res) => {
  const { name, user_id } = req.body;

  const query = 'INSERT INTO category (name, user_id) VALUES ($1, $2) RETURNING *';
  const values = [name, user_id];

  try {
    const result = await pool.query(query, values);
    const category = result.rows[0];
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all categories
exports.listCategories = async (req, res) => {
  const query = 'SELECT * FROM category';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, user_id } = req.body;

  const query = `
    UPDATE category 
    SET name = $1, user_id = $2
    WHERE id = $3
    RETURNING *`;
  const values = [name, user_id, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM category WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};