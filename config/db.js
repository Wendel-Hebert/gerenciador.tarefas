const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = db;
// Ordena os arquivos por nome (timestamp)
const migrationsDir = path.join(__dirname, "./");
exports.migrationsDir = migrationsDir;
