// Routes for components
const express = require('express');
const componentsController = require('../controllers/components.controller');

const router = express.Router();

// Search for a component
router.get('/components/search', componentsController.searchComponents);

// Get component by id
router.get('/components/:id', componentsController.getComponent);

// List all components
router.get('/components', componentsController.getComponents);

// Create new component
router.post('/components', componentsController.createComponent);

module.exports = router;
