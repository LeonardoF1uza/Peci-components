// Routes for components
const express = require('express');
const componentsController = require('../controllers/components.controller');

const router = express.Router();

// List all components
router.get('/components', componentsController.getComponents);

// Get component by id
router.get('/components/:id', componentsController.getComponent)

module.exports = router;
