const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

// POST
router.post('/users', userController.addUser);

// GET
router.get('/users', userController.getAllUsers);
router.get('/users/:nmec', userController.getUser);

// PUT
router.put('/users/:nmec', userController.updateUser);

module.exports = router;
