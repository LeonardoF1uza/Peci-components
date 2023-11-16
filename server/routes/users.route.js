// Routes for users
const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

// Search for a user
router.get('/users/search', usersController.searchUser);

// Get user by id
router.get('/users/:id', usersController.getUser);

// List all users
router.get('/users', usersController.getUsers);

module.exports = router;
