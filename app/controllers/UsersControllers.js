const conn = require('./../db/dbConnection');
let users = require('./../model/UsersModel');

const getAllUsers = (request, response, next) => {
    conn.query("SELECT * FROM Users", (err, rows) => {
        mapUsers(rows);
        err ? response.json({ success: false, err, }) : response.json({ users })
    });
};

const getUser = (request, response, next) => {
    id = request.params.id
    conn.query(`SELECT * FROM Users WHERE ID=${id}`, (err, rows) => {
        mapUsers(rows);
        err ? response.json({ success: false, err, }) : response.json({ users })
    });
};

function mapUsers(rows) {
    users = rows.map(user => {
        return {
            id: user.ID,
            name: user.name,
            surname: user.surname,
            password: user.password,
            mail: user.mail,
            photo: user.photo,
            admin: user.admin,
            creationDate: user.creationDate
        };
    });
}

module.exports = { getAllUsers, getUser };