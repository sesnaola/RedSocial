const mysql = require("mysql");
const config = require("../config/settings.json");

const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || config.db.host,
    user: process.env.MYSQL_USER || config.db.user,
    password: process.env.MYSQL_PASSWORD || config.db.password,
    database: process.env.MYSQL_DATABASE || config.db.database,
});

module.exports = connection;
