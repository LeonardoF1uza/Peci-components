const families = require('../services/families.service');

async function getFamilies(req, res) {
    try {
        const rows = await getFamilies();
        res.status(200).json([ rows ]);
    } catch (error) {
        console.error()
    }
}