const userQueries = require('../models/user');

async function getAllUsers(req, res) {
    try {
        const users = await userQueries.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error while getting all users: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function getUser(req, res) {
    try {
        const { nmec } = req.params;

        const user = await userQueries.getUser(nmec);
        if (user.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user[0]);
    } catch (error) {
        console.error('Error while getting user by nmec: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function addUser(req, res) {
    try {
        const { nmec, name, email } = req.body;
        const missingParams = [];

        // validate parameters
        if (!nmec) missingParams.push('nmec');
        if (!name) missingParams.push('name');
        if (!email) missingParams.push('email');
        if (missingParams.length > 0) {
            res.status(400).json({ message: `Missing required parameters: ${missingParams.join(', ')}` });
            return;
        }

        // check if user already exists
        const exists = await userExists(nmec);
        if (exists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        await userQueries.addUser(nmec, name, email);
        res.status(201).json({ message: 'User sucessfully created'});
    } catch (error) {
        console.error('Error while adding new user: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function updateUser(req, res) {
    try {
        const { nmec } = req.params;

        // check if component exists
        const existing = await userQueries.getUser(nmec);
        if (existing.length !== 1) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        const { name, email } = req.body;

        // create update object
        const update = {
            name: name || existing[0].name,
            email: email || existing[0].email
        }

        await userQueries.updateUser(nmec, update);
        res.status(200).json({ message: 'User sucessfully updated'});
    } catch (error) {
        console.error('Error while updating user: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function userExists(nmec) {
    const user = await userQueries.getUser(nmec);
    return user.length === 1;
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    userExists,
};
