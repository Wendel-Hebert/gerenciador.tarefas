const express = require('express');
const router = express.Router();

// Import route modules
const taskRoutes = require('./taskRoutes.js');   
const categoryRoutes = require('./categoryRoutes.js'); 
const userRoutes = require('./userRoutes.js');       

// Mount each route group under a specific path
router.use('/tasks', taskRoutes);         
router.use('/categories', categoryRoutes); 
router.use('/users', userRoutes);         

module.exports = router;
