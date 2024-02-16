const db = require('../../config/database');

function getAllRequisitions() {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM requisitions;',
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

function getRequisition(id) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM requisitions WHERE id = ?;',
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

function getRequisitionComponents(id) {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM requisitioned_components WHERE requisition_id = ?;',
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

function addRequisition(group_id, warehouse, description) {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO requisitions (`group_id`, `warehouse`, `description`) VALUES (?, ?, ?);',
            [group_id, warehouse, description],
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

function addComponentToRequisition(requisition_id, component_reference, quantity) {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO requisitioned_components (`requisition_id`, `component_reference`, `quantity`) VALUES (?, ?, ?);',
            [requisition_id, component_reference, quantity],
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

function removeComponentToRequisition(requisition_id, reference) {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM requisitioned_components WHERE requisition_id = ? AND reference = ?;',
            [requisition_id, reference],
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
    getAllRequisitions,
    getRequisition,
    getRequisitionComponents,
    addRequisition,
    addComponentToRequisition,
    removeComponentToRequisition,
}
