const express = require('express');
const requisitionController = require('../controllers/requisition');

const router = express.Router();

// POST
router.post('/requisitions', requisitionController.addRequisition);
router.post('/requisitions/register', requisitionController.registerGroupRequisition);


// GET
router.get('/requisitions', requisitionController.getAllRequisitions);
router.get('/requisitions/:id', requisitionController.getRequisition);

// PUT
//router.put('/projects/:id', projectController.updateProject);

module.exports = router;
