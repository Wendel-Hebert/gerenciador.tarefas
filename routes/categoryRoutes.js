const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Rotas para categorias
router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
