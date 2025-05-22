const db = require("../config/db.js");

const getAllTasks = async () => {
  const result = await db.query('SELECT * FROM task');
  return result.rows;
};

const getTaskById = async (id) => {
  const result = await db.query('SELECT * FROM task WHERE id = $1', [id]);
  return result.rows[0];
};

const createTask = async ({ title, description, status, due_date, user_id, category_id }) => {
  const result = await db.query(
    `INSERT INTO task (title, description, status, due_date, user_id, category_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [title, description, status, due_date, user_id, category_id]
  );
  return result.rows[0];
};

const updateTask = async (id, { title, description, status, due_date, user_id, category_id }) => {
  const result = await db.query(
    `UPDATE task
     SET title = $1, description = $2, status = $3, due_date = $4, user_id = $5, category_id = $6
     WHERE id = $7
     RETURNING *`,
    [title, description, status, due_date, user_id, category_id, id]
  );
  return result.rows[0];
};

const deleteTask = async (id) => {
  const result = await db.query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};