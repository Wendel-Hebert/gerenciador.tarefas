const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController.js');

console.log('taskController é:', taskController); 

router.get('/', taskController.getAll);
router.get('/:id', taskController.getById);
router.post('/', taskController.create);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.deleteTask);

module.exports = router;