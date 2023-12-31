require('dotenv').config()
const Pool = require("pg").Pool;
const pool = new Pool(
    {
        user: "postgres",
        password: process.env.PASSWORD,
        host: "localhost",
        port: 5432,
        database: "eatocracy_development"
    }
);

module.exports = pool;