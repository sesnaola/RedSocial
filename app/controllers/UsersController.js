const conn = require('../db/dbConnection');
let helper = require('./../helpers/checkIfUserExists');
let users = require('../models/Users');
const jwt = require('jsonwebtoken');

async function getUsers(request, response, next) {
    query = "SELECT * FROM Users";
    if (request.params.id) query = query + ` WHERE id=${request.params.id}`;

    conn.query(query, (err, rows) => {
        if (!rows) return response.status(404).json({ success: false, message: 'No users found' });
        mapUsers(rows);
        err ? response.status(500).json({ success: false, err, }) : response.json({ users }.users)
    });
};

const postUser = (request, response, next) => {
    if (!request.body.name) return response.status(400).json({ success: false, message: 'No name' });
    if (!request.body.surname) return response.status(400).json({ success: false, message: 'No surname' });
    if (!request.body.password) return response.status(400).json({ success: false, message: 'No password' });
    if (!request.body.mail) return response.status(400).json({ success: false, message: 'No mail' });

    conn.query(`select * from Users where mail='${request.body.mail}'`, (err, rows) => {
        if (err) return response.status(400).json({ success: false, err });
        if (rows.length > 0) return response.status(400).json({ success: false, message: 'Mail already exists' });
        checkPostUsersData(request.body);
        conn.query(`INSERT INTO Users (name, surname, password, mail, photo, admin, creationDate) 
                VALUES ('${users.name}', 
                '${users.surname}', 
                '${users.password}', 
                '${users.mail}', 
                '${users.photo}', 
                '${users.admin}', 
                '${users.creationDate}')`,
            (err, rows) => {
                err ? response.status(500).json({ success: false, err, }) : response.json({ success: true })

            });
    });
    checkPostUsersData(request.body);
    conn.query(`INSERT INTO Users (name, surname, password, mail, photo, admin, creationDate) 
        VALUES ('${users.name}', 
        '${users.surname}', 
        '${users.password}', 
        '${users.mail}', 
        '${users.photo}', 
        '${users.admin}', 
        '${users.creationDate}')`,
        (err, rows) => {
            err ? response.json({ success: false, err, }) : response.json({ success: true })
        });
}

const putUser = (request, response, next) => {
    decodedToken = jwt.decode(request.headers.authorization);
    helper.checkUser(decodedToken.id).then(result => {
        if (result) {
            if (result.id != request.body.userId) {
                return response.status(401).json({
                    success: false, message: 'The only one who can modify a user is the user himself'
                });
            } else {
                query = "UPDATE Users SET "
                if (!request.body.userId) return response.status(400).json({ success: false, message: 'No userId' });
                if (!request.body.name && !request.body.surname && !request.body.password && !request.body.mail) return response.status(400).json({ success: false, message: 'No data to update' });
                checkPutUsersData(request);

                helper.checkUser(request.body.userId).then(result => {
                    if (result) {
                        arrangePutUsersQuery(request, response);
                    } else {
                        response.status(404).json({ success: false, message: 'User does not exist' });
                    }
                });
            }
        }
    });
}

const postProfileImage = (request, response, next) => {
    if (!request.body.userId) return response.status(400).json({ success: false, message: 'No userId' });
    if (!request.files) return response.status(400).json({ success: false, message: 'No file uploaded' });
    if (!request.files.image) return response.status(400).json({ success: false, message: 'No image uploaded' });
    if (!request.files.image.mimetype.startsWith('image/jpeg') && !request.files.image.mimetype.startsWith('image/png')) return response.status(400).json({ success: false, message: 'Wrong file type' });
    if (request.files.image.size > 1000000) return response.status(400).json({ success: false, message: 'File too large' });

    helper.checkUser(request.body.userId).then(result => {
        if (result) {
            queryFileUpload(request, response);
        } else {
            return response.status(404).json({ success: false, message: 'User not found' });
        }
    });
};

const deleteUsers = (request, response, next) => {
    decodedToken = jwt.decode(request.headers.authorization)
    if (!request.body.userId) return response.status(400).json({ success: false, message: 'No userId' });
    checkIfUserExists(request, response);
};

function arrangePutUsersQuery(request, response) {
    query = query.split("'  ").join("', ");

    conn.query(query + ` WHERE ID = ${request.body.userId}`,
        (err, rows) => {
            err ? response.status(500).json({ success: false, err, }) : response.json({ success: true });
        });
}

function checkIfUserExists(request, response) {
    helper.checkUser(request.body.userId).then(result => {
        if (result) {
            chechIfItsAdmin(request, response);
        } else {
            return response.status(404).json({ success: false, message: 'User to delete does not exists' });
        };
    });
}

function chechIfItsAdmin(request, response) {
    helper.checkUser(decodedToken.id).then(result => {
        if (result) {
            if (checkAdmin(result.admin)) {
                conn.query(`DELETE FROM Users WHERE id=${request.body.userId}`, (err, rows) => {
                    err ? response.status(500).json({ success: false, err, }) : response.json({ success: true, message: 'User deleted' });
                });
            } else {
                return response.status(400).json({ success: false, message: 'You are not admin' });
            }
        }
    });
}

function queryFileUpload(request, response) {
    let image = request.files.image;
    route = "user" + request.body.userId + image.name;

    image.mv('./uploads/' + route, (err) => {
        if (err)
            return response.status(500).send(err);

        conn.query(`UPDATE Users SET photo='${route}' WHERE id=${request.body.userId}`, (err) => {
            if (err) return response.status(500).json({ success: false, err, });
            else return response.json({
                success: true,
                name: image.name,
                route: route,
                mimetype: image.mimetype,
                size: image.size
            });
        });
    });
}

function checkPutUsersData(request) {
    if (request.body.name) query += ` name = '${request.body.name.toString()}' `;
    if (request.body.surname) query += ` surname = '${request.body.surname.toString()}' `;
    if (request.body.password) query += ` password = '${request.body.password.toString()}' `;
    if (request.body.mail) query += ` mail = '${request.body.mail.toString()}' `;
}

const checkPostUsersData = (newUser) => {
    users.name = newUser.name.toString();
    users.surname = newUser.surname.toString();
    users.password = newUser.password.toString();
    users.mail = newUser.mail.toString();
    users.photo = "";
    users.admin = 0;
    users.creationDate = Math.floor(Date.now() / 1000);
}

const checkAdmin = (value) => {
    value == 1 ? users.admin = 1 : users.admin = 0;
    return users.admin;
}

function mapUsers(value) {
    users = value.map(user => {
        return {
            id: user.id,
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

module.exports = { getUsers, postUser, putUser, deleteUsers, postProfileImage };
