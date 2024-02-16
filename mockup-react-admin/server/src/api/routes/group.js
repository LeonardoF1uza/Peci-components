const express = require('express');
const groupController = require('../controllers/group');

const router = express.Router();

// POST
router.post('/groups', groupController.addGroup);

// GET
router.get('/groups', groupController.getAllGroups);
router.get('/groups/:id', groupController.getGroup);

// PUT
//router.put('/components/:reference', groupController.updateComponent);

module.exports = router;
