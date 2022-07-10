const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "dindin",
    password: "@ml144274",
    port: 5432,
    // ssl: {
    //     rejectUnauthourizad: false,
    // }

});

const query = (text, param) => {
    return pool.query(text, param);
};

module.exports = { query }
