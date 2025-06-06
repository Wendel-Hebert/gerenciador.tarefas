const db = require('../config/db');

async function create(data) {
  const { name, user_id } = data;
  
  const result = await db.query(
    `INSERT INTO category (name, user_id)
     VALUES ($1, $2)
     RETURNING *`,
    [name, user_id]
  );
  
  return result.rows[0];
}

async function getAll() {
  const result = await db.query(
    `SELECT * FROM category ORDER BY name`
  );
  
  return result.rows;
}

async function findById(id) {
  const result = await db.query(
    'SELECT * FROM category WHERE id = $1',
    [id]
  );
  
  return result.rows[0];
}

async function update(id, data) {
  const { name, user_id } = data;
  
  const result = await db.query(
    `UPDATE category SET name = $1, user_id = $2
     WHERE id = $3 RETURNING *`,
    [name, user_id, id]
  );
  
  return result.rows[0];
}

async function deleteById(id) {
  const result = await db.query(
    'DELETE FROM category WHERE id = $1 RETURNING *',
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
