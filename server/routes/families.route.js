// Routes for families
const express = require('express');
const familiesController = require('../controllers/families.controller');

const router = express.Router();

// Search for a family
router.get('/families/search', familiesController.searchFamilies);

// Get family by id
router.get('/families/:id', familiesController.getFamily);

// List all families
router.get('/families', familiesController.getFamilies);

// Create new family
router.post('/families', familiesController.createFamily);

module.exports = router;
