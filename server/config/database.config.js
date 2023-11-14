const dotenv = require('dotenv');
dotenv.config();

const db = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};

module.exports = db;
