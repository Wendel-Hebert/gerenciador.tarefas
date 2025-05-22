const express = require('express');
const router = express.Router();

// Import route modules
const taskRoutes = require('./taskRoutes');   
const categoryRoutes = require('./categoryRoutes'); 
const userRoutes = require('./userRoutes');       

// Root test route
router.get('/', (req, res) => {
  res.send('API is working!');
});

// Mount each route group under a specific path
router.use('/tasks', taskRoutes);         
router.use('/categories', categoryRoutes); 
router.use('/users', userRoutes);         

module.exports = router;
