const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// Create a new category
router.post('/', CategoryController.createCategory);

// Get all categories
router.get('/', CategoryController.listCategories);

// Update a category
router.put('/:id', CategoryController.updateCategory);

// Delete a category
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;