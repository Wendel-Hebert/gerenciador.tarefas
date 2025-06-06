const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Rotas para tarefas
router.post('/', taskController.create);
router.get('/', taskController.getAll);
router.get('/:id', taskController.getById);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
