const requisitionService = require('../services/requisitions.service');

async function getRequisitions(req, res) {
    try {
        const rows = await requisitionService.getAllRequisitions();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error listing components: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getRequisition(req, res) {
    try {
        const { id } = req.params;
        const requisition = await requisitionService.getRequisitionByID(id);
        res.status(200).json(requisition);
    } catch (error) {
        console.error("Error listing components: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function searchRequisitionsUser(req, res) {
    try {
        const userId = req.query.id;
        const rows = await requisitionService.searchRequisitionsByUser(userId);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error listing components: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function searchRequisitionsStatus(req, res) {
    try {
        const status = req.query.status;
        const rows = await requisitionService.searchRequisitionsByStatus(status);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error listing components: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getRequisitions,
    getRequisition,
    searchRequisitionsUser,
    searchRequisitionsStatus,
}
