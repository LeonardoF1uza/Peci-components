const db = require('../../config/database');

function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM users;',
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

function getUser(nmec) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM users WHERE nmec = ?;',
            [nmec],
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

function addUser(nmec, name, email) {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO users (nmec, name, email) VALUES (?, ?, ?);',
            [nmec, name, email],
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

function updateUser(nmec, updateUser) {
    const {name, email} = updateUser;
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE users SET name = ?, email = ? WHERE nmec = ?;',
            [name, email, nmec],
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

function queryUsers() {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE users SET email = ? WHERE nmec = ?;',
            [email, nmec],
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
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    queryUsers,
}