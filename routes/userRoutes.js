const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rotas para usuários
router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.deleteUser);

module.exports = router;
