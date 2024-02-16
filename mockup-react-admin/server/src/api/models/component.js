const db = require('../../config/database');

function getAllComponents() {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM components;',
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

function getComponent(reference) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM components WHERE reference = ?;',
            [reference],
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

function addComponent(newComponent) {
    const { reference, family_id, designation, quantity, price, warehouse, position, description } = newComponent;
    return new Promise((resolve, reject) => {
        db.query(
            `
            INSERT INTO components
                (reference, family_id, designation, quantity, price, warehouse, position, description)
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?);
            `,
            [reference, family_id, designation, quantity, price, warehouse, position, description],
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

function updateComponent(reference, updateComponent) {
    const {family_id, designation, quantity, price, warehouse, position, description } = updateComponent;
    return new Promise((resolve, reject) => {
        db.query(
            `
            UPDATE components
            SET
                family_id = ?, designation = ?, quantity = ?,
                price = ?, warehouse = ?, position = ?, description = ?
            WHERE
                reference = ?;
            `,
            [family_id, designation, quantity, price, warehouse, position, description, reference],
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
    getAllComponents,
    getComponent,
    addComponent,
    updateComponent,
}