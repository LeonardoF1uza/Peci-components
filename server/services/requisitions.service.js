const database = require('./database.service');

async function getAllRequisitions() {
    const requisitions = await database.query(
        `
        SELECT * FROM requisitions ;
        `,
    );
    return requisitions;
}

async function getRequisitionByID(id) {
    const requisition = await database.query(
        `
        SELECT * FROM requisitions WHERE requisition_id = ? LIMIT 1;
        `,
        [id]
    );
    return requisition;
}

async function searchRequisitionsByUser(id) {
    const requisitions = await database.query(
        `
        SELECT
            *
        FROM
            requisitions
        WHERE
            user_id = ?
        `,
        [id]
    );
    return requisitions;
}

async function searchRequisitionsByStatus(status) {
    const requisitions = await database.query(
        `
        SELECT
            *
        FROM
            requisitions
        WHERE
            status = ?
        `,
        [status]
    );
    return requisitions;
}

module.exports = {
    getAllRequisitions,
    getRequisitionByID,
    searchRequisitionsByUser,
    searchRequisitionsByStatus,
}
