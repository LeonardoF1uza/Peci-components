const mysql = require('mysql2/promise');
const dbConfig = require('../config/database.config')


async function query(sql, params) {
    const pool = await mysql.createConnection(dbConfig);
    const [results, ] = await pool.execute(sql, params);
    return results;
}

module.exports = { query };
