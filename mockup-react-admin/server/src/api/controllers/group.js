const groupQueries = require('../models/group');
const userController = require('../controllers/user');
const userQueries = require('../models/user');

async function getAllGroups(req, res) {
    try {
        const groups = await groupQueries.getAllGroups();

        for (const group of groups) {
            const users = await groupQueries.getGroupUsers(group.id);
            group.users = users;
        }
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error while getting all groups: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function getGroup(req, res) {
    try {
        const { id } = req.params;

        const groups = await groupQueries.getGroup(id);
        if (groups.length === 0) {
            res.status(404).json({ message: 'Group not found' });
            return;
        }
        const users = await groupQueries.getGroupUsers(groups[0].id);
        groups[0].users = users;

        res.status(200).json(groups[0]);
    } catch (error) {
        console.error('Error while getting group by id: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function addGroup(req, res) {
    try {
        let {
            user_nmec,
            name,
            professor,
            project_id,
            users,
        } = req.body;

        const missingParams = [];

        // validate parameters
        if (!user_nmec) missingParams.push('user_nmec');
        if (!name) missingParams.push('name');
        if (!professor) missingParams.push('professor');
        if (!project_id) missingParams.push('project_id');
        if (!users) missingParams.push('users');

        if (missingParams.length > 0) {
            res.status(400).json({ message: `Missing required parameters: ${missingParams.join(', ')}` });
            return;
        }

        // verify if leader exists in the users list
        if (!users.some(user => user.nmec === user_nmec)) {
            res.status(400).json({ message: `User_nmec ${user_nmec} is not on the given list of users` });
            return;
        }

        // for every user verify if they exist, if not add them
        for (const user of users) {
            const exists = await userController.userExists(user.nmec);
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

        const created = await groupQueries.addGroup(newGroup);
        for (const user of users) {
            await groupQueries.addUserToGroup(created.insertId, user.nmec)
        }

        res.status(200).json({ message: 'Group sucessfully created'});
    } catch (error) {
        console.error('Error while adding new group: ' + error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
}

async function groupExists(id) {
    const group = await groupQueries.getGroup(id);
    return group.length === 1;
}

module.exports = {
    getAllGroups,
    getGroup,
    addGroup,
    groupExists,
}
