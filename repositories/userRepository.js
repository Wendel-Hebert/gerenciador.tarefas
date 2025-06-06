const db = require('../config/db');

async function create(data) {
  const { name, email, password } = data;
  
  const result = await db.query(
    `INSERT INTO "user" (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, password]
  );
  
  return result.rows[0];
}

async function getAll() {
  const result = await db.query(
    `SELECT id, name, email, created_at FROM "user" ORDER BY name`
  );
  
  return result.rows;
}

async function findById(id) {
  const result = await db.query(
    'SELECT id, name, email, created_at FROM "user" WHERE id = $1',
    [id]
  );
  
  return result.rows[0];
}

async function findByEmail(email) {
  const result = await db.query(
    'SELECT id, name, email, created_at FROM "user" WHERE email = $1',
    [email]
  );
  
  return result.rows[0];
}

async function update(id, data) {
  const { name, email, password } = data;
  
  // Se a senha for fornecida, atualize-a também
  let query;
  let params;
  
  if (password) {
    query = `UPDATE "user" SET name = $1, email = $2, password = $3
             WHERE id = $4 RETURNING id, name, email, created_at`;
    params = [name, email, password, id];
  } else {
    query = `UPDATE "user" SET name = $1, email = $2
             WHERE id = $3 RETURNING id, name, email, created_at`;
    params = [name, email, id];
  }
  
  const result = await db.query(query, params);
  return result.rows[0];
}

async function deleteById(id) {
  const result = await db.query(
    'DELETE FROM "user" WHERE id = $1 RETURNING id, name, email',
    [id]
  );
  
  return result.rows[0];
}

module.exports = {
  create,
  getAll,
  findById,
  findByEmail,
  update,
  delete: deleteById
};
