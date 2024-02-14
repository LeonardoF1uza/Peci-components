const express = require('express');
const componentController = require('../controllers/component');

const router = express.Router();

// POST
router.post('/components', componentController.addComponent);

// GET
router.get('/components', componentController.getAllComponents);
router.get('/components/:reference', componentController.getComponent);

// PUT
router.put('/components/:reference', componentController.updateComponent);

module.exports = router;
