const db = require('../config/db.js');

async function create(data) {
  const result = await db.query(
    `INSERT INTO task (title, description, status, due_date, user_id, category_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [data.title, data.description, data.status, data.due_date, data.user_id, data.category_id]
  );
  return result.rows[0];
}

async function getAll() {
  const result = await db.query('SELECT * FROM task');
  return result.rows;
}

async function findById(id) {
  const result = await db.query(
    'SELECT * FROM task WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

async function update(id, data) {
  const result = await db.query(
    `UPDATE task SET title = $1, description = $2, status = $3, due_date = $4, user_id = $5, category_id = $6
     WHERE id = $7 RETURNING *`,
    [data.title, data.description, data.status, data.due_date, data.user_id, data.category_id, id]
  );
  return result.rows[0];
}

async function deleteById(id) {
  const result = await db.query(
    'DELETE FROM task WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  create,
  getAll,
  findById,
  update,
  delete: deleteById
};
