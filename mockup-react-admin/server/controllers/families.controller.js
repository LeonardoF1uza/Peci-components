const familiesService = require('../services/families.service');

async function getFamilies(req, res) {
    try {
        const rows = await familiesService.getAllFamilies();
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getFamily(req, res) {
    try {
        const { id } = req.params;
        const family = await familiesService.getFamilyByID(id);
        res.status(200).json(family);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function searchFamilies(req, res) {
    try {
        const searchQuery = req.query.q;
        const rows = await familiesService.searchFamilies(searchQuery);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createFamily(req, res) {
    try {
        const { family_name } = req.body;
        console.log(family_name);
        const created = await familiesService.createFamily(family_name);
        res.status(201).json(created);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getFamilies,
    getFamily,
    searchFamilies,
    createFamily,
}
