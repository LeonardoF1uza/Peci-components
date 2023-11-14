const componentsService = require('../services/components.service');

async function getComponents(req, res) {
    try {
        const rows = await componentsService.getComponents();
        res.status(200).json( rows );
    } catch (error) {
        console.error("Error listing components: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getComponent(req, res) {
    try {
        const { id } = req.params;
        const component = await componentsService.getComponent(id);
        res.json( component );
    } catch (error) {
        console.error("Error listing components: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createComponent(req, res) {
    try {
        const {
            family_id, name, reference, position,
            quantity, price, description
        } = req.body;

        //if (!family_id)
        // Validate fields
    } catch (error) {

    }
}

module.exports = {
    getComponents,
    getComponent,
}
