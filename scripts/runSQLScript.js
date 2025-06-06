const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');

async function runMigration() {
  try {
    console.log('Iniciando migração do banco de dados...');
    
    // Lê o arquivo SQL
    const sqlPath = path.join(__dirname, 'database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Executa o script SQL
    await pool.query(sql);
    
    console.log('✅ Migração concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar migração:', error);
  } finally {
    // Fecha a conexão com o pool
    await pool.end();
  }
}

runMigration();