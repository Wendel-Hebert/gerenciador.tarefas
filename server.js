require('dotenv').config();


// server.js
const express = require('express');
const db = require('./config/db');
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Importação das rotas
const app = express();
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/categories', categoryRoutes);

// Rota de teste com banco (agora não será sobrescrita)
app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.send(`Hora atual no banco: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Erro na rota de teste /:', err);
    res.status(500).send('Erro ao conectar com o banco na rota de teste.');
  }
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
    console.error('Erro global não capturado:', err);
    res.status(err.statusCode || 500).json({ error: err.message || 'Ocorreu um erro inesperado no servidor.' });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});