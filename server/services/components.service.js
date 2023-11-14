const database = require('./database.service');

async function getComponents() {
    const components = await database.query(
        `SELECT * FROM components`,
    );
    return components;
}

async function getComponent(componentId) {
    const component = await database.query(
        `SELECT * FROM components WHERE component_id = ? LIMIT 1`,
        [componentId]
    );
    return component;
}

module.exports = {
    getComponents,
    getComponent,
}
