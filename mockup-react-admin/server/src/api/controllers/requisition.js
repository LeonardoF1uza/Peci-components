const requisitionQueries = require('../models/requisition');
const componentQueries = require('../models/component');
const userQueries = require('../models/user');
const groupQueries = require('../models/group');
const componentControllers = require('../controllers/component');
const groupControllers = require('../controllers/group');
const userControllers = require('../controllers/user');

async function getAllRequisitions(req, res) {
    try {
        const requisitions = await requisitionQueries.getAllRequisitions();

        for (const requisition of requisitions) {
            const reqCom = await requisitionQueries.getRequisitionComponents(requisition.id);
            requisition.requisitioned_components = [];
            for (const c of reqCom) {
                const component = await componentQueries.getComponent(c.component_reference);
                component.quantity = c.quantity;  // requisitioned quantity
                requisition.requisitioned_components.push(component[0]);
            }
        }
        res.status(200).json(requisitions);
    } catch (error) {
        console.error('Error while getting all requisitions: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function getRequisition(req, res) {
    try {
        const { id } = req.params;

        const requisition = await requisitionQueries.getRequisition(id);
        if (requisition.length === 0) {
            res.status(404).json({ message: 'Requisition not found' });
            return;
        }

        const reqCom = await requisitionQueries.getRequisitionComponents(requisition[0].id);
        requisition[0].requisitioned_components = [];

        for (const c of reqCom) {
            const component = await componentQueries.getComponent(c.component_reference);
            component[0].quantity = c.quantity;  // requisitioned quantity
            requisition[0].requisitioned_components.push(component[0]);
        }
        res.status(200).json(requisition[0]);
    } catch (error) {
        console.error('Error while getting requisition by id: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function addRequisition(req, res) {
    try {
        let {
            group_id,
            components,
        } = req.body;

        const missingParams = [];

        // validate parameters
        if (!group_id) missingParams.push('group_id');
        if (!components) missingParams.push('components');

        if (missingParams.length > 0) {
            res.status(400).json({ message: `Missing required parameters: ${missingParams.join(', ')}` });
            return;
        }

        // validate group_id
        const exists = await groupControllers.groupExists(group_id);
        if (!exists) {
            res.status(404).json({ message: `Group with id '${group_id}' not found` });
            return;
        }

        // validate components field
        if (components.length <= 0) {
            res.status(404).json({ message: 'No components given' });
            return;
        }
        for (const c of components) {
            const exists = componentControllers.componentExists(c.reference);
            if (!exists) {
                res.status(404).json({ message: `Component with reference '${c.reference}' not found` });
            }
        }

        const created = await requisitionQueries.addRequisition(group_id);
        for (const c of components) {   // add components to requisition
            await requisitionQueries.addComponentToRequisition(created.insertId, c.reference, c.quantity);
        }

        res.status(200).json({ message: 'Requisition sucessfully added'});
    } catch (error) {
        console.error('Error while adding new requisition: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function registerGroupRequisition(req, res) {
    try {
        let {
            group,
            components,
            warehouse,
            description,
        } = req.body;

        let missingParams = [];

        // validate parameters
        if (!group) missingParams.push('group');
        if (!components) missingParams.push('components');
        if (!warehouse) missingParams.push('warehouse');

        if (missingParams.length > 0) {
            res.status(400).json({ message: `Missing required parameters: ${missingParams.join(', ')}` });
            return;
        }

        // validate components field
        if (components.length <= 0) {
            res.status(404).json({ message: 'No components given' });
            return;
        }

        let {
            user_nmec,
            name,
            professor,
            project_id,
            users,
        } = group;

        missingParams = [];
        if (!user_nmec) missingParams.push('user_nmec');
        if (!name) missingParams.push('name');
        if (!professor) missingParams.push('professor');
        if (!project_id) missingParams.push('project_id');
        if (!users) missingParams.push('users');

        if (!description) description = null;

        if (missingParams.length > 0) {
            res.status(400).json({ message: `Missing required parameters: ${missingParams.join(', ')}` });
            return;
        }

        // verify if leader exists in the users list
        if (!users.some(user => user.nmec === user_nmec)) {
            res.status(400).json({ message: `User_nmec ${user_nmec} is not on the given list of users` });
            return;
        }

        // verify if components exist
        for (const c of components) {
            const exists = componentControllers.componentExists(c.reference);
            if (!exists) {
                res.status(404).json({ message: `Component with reference '${c.reference}' not found` });
            }
        }

        // for every user verify if they exist, if not add them
        for (const user of users) {
            const exists = await userControllers.userExists(user.nmec);
            if (!exists) {
                await userQueries.addUser(user.nmec, user.name, user.email);
            }
        }

        const newGroup = {
            user_nmec,
            name,
            professor,
            project_id,
        }

        const createdGroup = await groupQueries.addGroup(newGroup);
        for (const user of users) {
            await groupQueries.addUserToGroup(createdGroup.insertId, user.nmec)
        }

        const createdRequisition = await requisitionQueries.addRequisition(createdGroup.insertId, warehouse, description);
        for (const c of components) {   // add components to requisition
            await requisitionQueries.addComponentToRequisition(createdRequisition.insertId, c.reference, c.quantity);
        }

        res.status(200).json({ message: 'GroupRequisition sucessfully registered'});
    } catch (error) {
        console.error('Error while registering new group requisition: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

module.exports = {
    getAllRequisitions,
    getRequisition,
    addRequisition,
    registerGroupRequisition,
}
