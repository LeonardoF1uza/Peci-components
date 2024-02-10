const usersService = require('../services/users.service');

async function getUsers(req, res) {
    try {
        const rows = await usersService.getAllUsers();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error listing components: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = await usersService.getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error listing components: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function searchUser(req, res) {
    try {
        const searchQuery = req.query.q;
        const rows = await usersService.searchUsers(searchQuery);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error listing components: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getUsers,
    getUser,
    searchUser,
}
