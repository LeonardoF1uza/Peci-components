const database = require('./database.service');

async function getFamilies() {
    const families = await database.query(
        `SELECT * FROM families`,
    );
    return families;
}

async function getFamily(family_id) {
    const family = await database.query(
        `SELECT * FROM families WHERE family_id = ? LIMIT 1`,
        [family_id]
    );
    return family;
}

module.exports = {
    getFamilies,
    getFamily,
}
