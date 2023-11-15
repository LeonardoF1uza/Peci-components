const database = require('./database.service');

async function getAllComponents() {
    const components = await database.query(
        `SELECT * FROM components`,
    );
    return components;
}

async function getComponentByID(componentId) {
    const component = await database.query(
        `SELECT * FROM components WHERE component_id = ? LIMIT 1`,
        [componentId]
    );
    return component;
}

async function searchComponents(query) {
    const components = await database.query(
        `
        SELECT
            components.component_id,
            components.family_id,
            components.name,
            components.reference,
            components.position,
            components.quantity,
            components.price,
            components.description
        FROM
            components
        JOIN
            families ON components.family_id = families.family_id
        WHERE
            components.name LIKE ? OR
            components.description LIKE ? OR
            families.family_name LIKE ? ;
        `,
        [`%${query}%`,`%${query}%`,`%${query}%`]
    );
    return components;
}

async function createComponent(newComponent) {
    const {
        family_id,
        name,
        reference,
        position,
        quantity,
        price,
        description
    } = newComponent;

    const result = await database.query(
        `
        INSERT INTO components
            (family_id, name, reference, position, quantity, price, description)
        VALUES
            (?, ?, ?, ?, ?, ?, ?) ;
        `,
        [family_id, name, reference, position, quantity, price, description]
    );
    const created = await getComponentByID(result.insertId);
    return created;
}

module.exports = {
    getAllComponents,
    getComponentByID,
    searchComponents,
    createComponent,
}
