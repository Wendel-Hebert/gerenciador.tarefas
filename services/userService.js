// services/userService.js

const db = require("../config/db.js");

// Função para obter todos os usuários
const getAllUsers = async () => {
  try {
    const result = await db.query('SELECT * FROM "user"');
    return result.rows;
  } catch (error) {
    throw new Error("Erro ao obter usuários: " + error.message);
  }
};

// Função para obter um usuário por ID
const getUserById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM "user" WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao obter usuário: " + error.message);
  }
};

// Função para criar um novo usuário
const createUser = async (name, email, password) => {
  try {
    const result = await db.query(
      'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao criar usuário: " + error.message);
  }
};

// Função para atualizar um usuário por ID
const updateUser = async (id, name, email, password) => {
  try {
    const result = await db.query(
      'UPDATE "user" SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
      [name, email, password, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao atualizar usuário: " + error.message);
  }
};

// Função para deletar um usuário por ID
const deleteUser = async (id) => {
  try {
    const result = await db.query(
      'DELETE FROM "user" WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Erro ao deletar usuário: " + error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
