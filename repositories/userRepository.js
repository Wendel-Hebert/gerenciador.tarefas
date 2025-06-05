const db = require('../config/db.js');

async function create(data) {
  const result = await db.query(
    'INSERT INTO public.user (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [data.name, data.email, data.password]
  );
  return result.rows[0];
}

async function getAll() {
  const result = await db.query('SELECT * FROM public.user');
  return result.rows;
}

async function findById(id) {
  const result = await db.query(
    'SELECT * FROM public.user WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

async function update(id, data) {
  const result = await db.query(
    'UPDATE public.user SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
    [data.name, data.email, data.password, id]
  );
  return result.rows[0];
}

async function deleteById(id) {
  const result = await db.query(
    'DELETE FROM public.user WHERE id = $1 RETURNING *',
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
