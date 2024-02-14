const componentQueries = require('../models/component');

async function getAllComponents(req, res) {
    try {
        const components = await componentQueries.getAllComponents();
        res.status(200).json(components);
    } catch (error) {
        console.error('Error while getting all components: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function getComponent(req, res) {
    try {
        const { reference } = req.params;

        const component = await componentQueries.getComponent(reference);
        if (component.length === 0) {
            res.status(404).json({ message: 'Component not found' });
            return;
        }
        res.status(200).json(component[0]);
    } catch (error) {
        console.error('Error while getting component by reference: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function addComponent(req, res) {
    try {
        let {
            reference,
            family_id,
            designation,
            quantity,
            price,
            warehouse,
            position,
            description,
        } = req.body;

        const missingParams = [];

        // validate parameters
        if (!reference) missingParams.push('reference');
        if (!family_id) missingParams.push('family_id');
        if (!designation) missingParams.push('designation');
        if (!quantity) missingParams.push('quantity');
        if (!price) missingParams.push('price');
        if (!warehouse) missingParams.push('warehouse');

        if (missingParams.length > 0) {
            res.status(400).json({ message: `Missing required parameters: ${missingParams.join(', ')}` });
            return;
        }
        // fill non mandatory parameters if necessary
        if (!position) position = null;
        if (!description) description = null;

        // check if component already exists
        const exists = await componentExists(reference);
        if (exists) {
            res.status(400).json({ message: 'Component already exists' });
            return;
        }

        const newComponent = {
            reference,
            family_id,
            designation,
            quantity,
            price,
            warehouse,
            position,
            description,
        }
        await componentQueries.addComponent(newComponent);
        res.status(201).json({ message: 'Component sucessfully created'});

    } catch (error) {
        console.error('Error while getting adding new component: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function updateComponent(req, res) {
    try {
        const { reference } = req.params;

        // check if component exists
        const component = await componentQueries.getComponent(reference);
        if (component.length !== 1) {
            res.status(400).json({ message: 'Component not found' });
            return;
        }

        const {
            family_id,
            designation,
            quantity,
            price,
            warehouse,
            position,
            description,
        } = req.body;

        // create update object
        const update = {
            family_id: family_id || component[0].family_id,
            designation: designation || component[0].designation,
            quantity: quantity || component[0].quantity,
            price: price || component[0].price,
            warehouse: warehouse || component[0].warehouse,
            position: position || component[0].position,
            description: description || component[0].description,
        };

        await componentQueries.updateComponent(reference, update);
        res.status(200).json({ message: 'Component sucessfully updated'});

    } catch (error) {
        console.error('Error while updating component: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}


async function componentExists(reference) {
    const component = await componentQueries.getComponent(reference);
    return component.length === 1;
}

module.exports = {
    getAllComponents,
    getComponent,
    addComponent,
    updateComponent,
};
