const database = require('./database.service');

async function getAllFamilies() {
    const families = await database.query(
        `SELECT * FROM families`,
    );
    return families;
}

async function getFamilyByID(family_id) {
    const family = await database.query(
        `SELECT * FROM families WHERE family_id = ? LIMIT 1`,
        [family_id]
    );
    return family;
}

async function searchFamilies(query) {
    const families = await database.query(
        `
        SELECT
            *
        FROM
            families
        WHERE
            family_name LIKE ? ;
        `,
        [`%${query}%`]
    );
    return families;
}

async function createFamily(familyName) {
    const result = await database.query(
        `
        INSERT INTO families
            (family_name)
        VALUES
            (?) ;
        `,
        [familyName]
    );
    const created = await getFamilyByID(result.insertId);
    return created;
}

module.exports = {
    getAllFamilies,
    getFamilyByID,
    searchFamilies,
    createFamily,
}
