require('dotenv').config();

// server.js
const express = require('express');
const path = require('path');
const db = require('./config/db');
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Importação das rotas
const app = express();
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Configuração do middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração da view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));

// Configuração de arquivos estáticos
app.use(express.static(path.join(__dirname, 'views/assets')));

// Rotas da API
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/categories', categoryRoutes);

// Rotas de páginas
app.get('/', (req, res) => {
  res.render('index', { title: 'Gerenciador de Tarefas' });
});

app.get('/tasks', (req, res) => {
  res.render('tasks', { title: 'Gerenciar Tarefas' });
});

app.get('/categories', (req, res) => {
  res.render('categories', { title: 'Gerenciar Categorias' });
});

app.get('/users', (req, res) => {
  res.render('users', { title: 'Gerenciar Usuários' });
});

// Rota de teste com banco
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.send(`Hora atual no banco: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Erro na rota de teste /test-db:', err);
    res.status(500).send('Erro ao conectar com o banco na rota de teste.');
  }
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
    console.error('Erro global não capturado:', err);
    res.status(err.statusCode || 500).json({ error: err.message || 'Ocorreu um erro inesperado no servidor.' });
});

// Middleware para rotas não encontradas (404)
app.use((req, res) => {
    res.status(404).render('error', { 
        title: 'Página não encontrada',
        message: 'A página que você está procurando não existe.'
    });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
