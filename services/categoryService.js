const db = require("../config/db.js");

const getAllCategories = async () => {
  const result = await db.query('SELECT * FROM category');
  return result.rows;
};

const getCategoryById = async (id) => {
  const result = await db.query('SELECT * FROM category WHERE id = $1', [id]);
  return result.rows[0];
};

const createCategory = async ({ name, user_id }) => {
  const result = await db.query(
    'INSERT INTO category (name, user_id) VALUES ($1, $2) RETURNING *',
    [name, user_id]
  );
  return result.rows[0];
};

const updateCategory = async (id, { name, user_id }) => {
  const result = await db.query(
    'UPDATE category SET name = $1, user_id = $2 WHERE id = $3 RETURNING *',
    [name, user_id, id]
  );
  return result.rows[0];
};

const deleteCategory = async (id) => {
  const result = await db.query('DELETE FROM category WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};