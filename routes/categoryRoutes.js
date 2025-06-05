const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController.js');

console.log('categoryController é:', categoryController); 


router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;