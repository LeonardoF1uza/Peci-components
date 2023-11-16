const database = require('./database.service');

async function getAllUsers() {
    const users = await database.query(
        `
        SELECT * FROM users ;
        `,
    );
    return users;
}

async function getUserById(id) {
    const user = await database.query(
        `
        SELECT * FROM users WHERE user_id = ? LIMIT 1;
        `,
        [id]
    );
    return user;
}

async function searchUsers(query) {
    const users = await database.query(
        `
        SELECT
            *
        FROM
            users
        WHERE
            name LIKE ? OR
            nmec LIKE ? ;
        `,
        [`%${query}%`, `%${query}%`]
    );
    return users;
}

module.exports = {
    getAllUsers,
    getUserById,
    searchUsers,
}
