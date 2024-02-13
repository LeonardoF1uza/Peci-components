// Routes for users
const express = require('express');
const requisitionsController = require('../controllers/requisitions.controller');

const router = express.Router();


// Get requesitions by user id
router.get('/requisitions/user', requisitionsController.searchRequisitionsUser);

// Get requesitions by status
router.get('/requisitions/status', requisitionsController.searchRequisitionsStatus);

// Get requisition by id
router.get('/requisitions/:id', requisitionsController.getRequisition);

// Get all requisitions
router.get('/requisitions', requisitionsController.getRequisitions);

module.exports = router;
