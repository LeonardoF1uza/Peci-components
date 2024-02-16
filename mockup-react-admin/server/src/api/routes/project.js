const express = require('express');
const projectController = require('../controllers/project');

const router = express.Router();

// POST
router.post('/projects', projectController.addProject);

// GET
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProject);

// PUT
router.put('/projects/:id', projectController.updateProject);

module.exports = router;
