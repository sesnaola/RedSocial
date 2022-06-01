const conn = require('./../db/dbConnection');

const getAllUsers = (request, response, next) => {
    conn.query("SELECT * FROM Users", (err, rows) => {
        err ? response.json({ success: false, err, }) : response.json({ rows }.rows)
    });
};

const getUser = (request, response, next) => {
    id = request.params.name
    conn.query(`SELECT * FROM Users WHERE ID=${id}`, (err, rows) => {
        err ? response.json({ success: false, err, }) : response.json({ rows }.rows)
    });
};

module.exports = { getAllUsers, getUser };
