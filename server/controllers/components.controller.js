const componentsService = require('../services/components.service');

async function getComponents(req, res) {
    try {
        const rows = await componentsService.getAllComponents();
        res.status(200).json( rows );
    } catch (error) {
        console.error("Error listing components: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getComponent(req, res) {
    try {
        const { id } = req.params;
        const component = await componentsService.getComponentByID(id);
        res.status(200).json( component );
    } catch (error) {
        console.error("Error listing components: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function searchComponents(req, res) {
    try {
        const searchQuery = req.query.q;
        const rows = await componentsService.searchComponents(searchQuery);
        res.status(200).json( rows );
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

        // TODO: validate fields

        const newComponent = {
            family_id,
            name,
            reference,
            position,
            quantity,
            price,
            description,
        };

        const created = await componentsService.createComponent(newComponent);
        res.status(201).json(created);

    } catch (error) {
        console.error("Error listing components: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getComponents,
    getComponent,
    searchComponents,
    createComponent,
}
