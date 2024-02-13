const database = require('./database.service');

async function getAllRequisitions() {
    const requisitions = await database.query(
        `
        SELECT
            requisitions.requisition_id,
            users.name AS user_name,
            components.name,
            requisitions.quantity,
            requisitions.status,
            requisitions.created_at,
            users.email AS user_email
        FROM
            requisitions
        JOIN
            users ON requisitions.user_id = users.user_id
        JOIN
            components ON requisitions.component_id = components.component_id ;
        `,
    );
    return requisitions;
}

async function getRequisitionByID(id) {
    const requisition = await database.query(
        `
        SELECT
            requisitions.requisition_id,
            users.name AS user_name,
            components.name,
            requisitions.quantity,
            requisitions.status,
            requisitions.created_at,
            users.email AS user_email
        FROM
            requisitions
        JOIN
            users ON requisitions.user_id = users.user_id
        JOIN
            components ON requisitions.component_id = components.component_id
        WHERE requisitions.requisition_id = ? LIMIT 1 ;
        `,
        [id]
    );
    return requisition;
}

async function searchRequisitionsByUser(name) {
    const requisitions = await database.query(
        `
        SELECT
            requisitions.requisition_id,
            users.name AS user_name,
            components.name,
            requisitions.quantity,
            requisitions.status,
            requisitions.created_at,
            users.email AS user_email
        FROM
            requisitions
        JOIN
            users ON requisitions.user_id = users.user_id
        JOIN
            components ON requisitions.component_id = components.component_id
        WHERE
            users.name LIKE ? ;
        `,
        [`%${name}%`]
    );
    return requisitions;
}

async function searchRequisitionsByStatus(status) {
    const requisitions = await database.query(
        `
        SELECT
            requisitions.requisition_id,
            users.name AS user_name,
            components.name,
            requisitions.quantity,
            requisitions.created_at,
            requisitions.status,
            users.email AS user_email
        FROM
            requisitions
        JOIN
            users ON requisitions.user_id = users.user_id
        JOIN
            components ON requisitions.component_id = components.component_id
        WHERE
            status = ? ;
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
