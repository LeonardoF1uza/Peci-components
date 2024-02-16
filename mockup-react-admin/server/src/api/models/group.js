const db = require('../../config/database');

function getAllGroups() {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM \`groups\`;`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}

function getGroup(id) {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM \`groups\` WHERE id = ?;`,
            [id],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}

function getGroupUsers(id) {
    return new Promise((resolve, reject) => {
        db.query(
            `
            SELECT u.*
            FROM users u
            JOIN groups_users gu ON u.nmec = gu.user_nmec
            WHERE gu.group_id = ?;
            `,
            [id],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}

function addGroup(newGroup) {
    const {user_nmec, name, professor, project_id} = newGroup;
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO `groups` (user_nmec, name, professor, project_id) VALUES (?, ?, ?, ?);',
            [user_nmec, name, professor, project_id],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}

function updateGroup(id, updateGroup) {
    const {user_nmec, name, professor, project_id} = updateGroup;
    return new Promise((resolve, reject) => {
        db.query(
            `
            UPDATE \`groups\`
            SET
                user_nmec = ?, name = ?, professor = ?, project_id = ?
            WHERE
                id = ?;
            `,
            [user_nmec, name, professor, project_id, id],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}

function addUserToGroup(group_id, user_nmec) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO groups_users (group_id, user_nmec) VALUES (?, ?);`,
            [group_id, user_nmec],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}

function removeUserFromGroup(group_id, user_nmec) {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM groups_users WHERE group_id = ? AND user_id = ?;`,
            [group_id, user_nmec],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }
        );
    });
}

module.exports = {
    getAllGroups,
    getGroup,
    getGroupUsers,
    addGroup,
    updateGroup,
    addUserToGroup,
    removeUserFromGroup,
}
