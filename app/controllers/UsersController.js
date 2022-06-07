const conn = require('../db/dbConnection');
let helper = require('./../helpers/checkIfUserExists');
let users = require('../models/Users');
const jwt = require('jsonwebtoken');

const getUsers = (request, response, next) => {
    query = "SELECT * FROM Users";
    if (request.query.userId) query = query + ` WHERE id=${request.query.userId}`;

    conn.query(query, (err, rows) => {
        mapUsers(rows);
        err ? response.json({ success: false, err, }) : response.json({ users }.users)
    });
};

const postUser = (request, response, next) => {
    checkNewUsers(request.body);
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

const postProfileImage = (request, response, next) => {
    if (!request.body.userId) return response.json({ success: false, message: 'No userId' });
    if (!request.files) return response.json({ success: false, message: 'No file uploaded' });
    if (!request.files.image) return response.json({ success: false, message: 'No image uploaded' });
    if (!request.files.image.mimetype.startsWith('image/jpeg') && !request.files.image.mimetype.startsWith('image/png')) return response.json({ success: false, message: 'Wrong file type' });
    if (request.files.image.size > 1000000) return response.json({ success: false, message: 'File too large' });

    helper.checkUser(request.body.userId).then(result => {
        if (result) {
            queryFileUpload(request, response);
        } else {
            return response.json({ success: false, message: 'User not found' });
        }
    });
};

const deleteUsers = (request, response, next) => {
    decodedToken = jwt.decode(request.headers.authorization)
    if (!request.body.userId) return response.json({ success: false, message: 'No userId' });
    checkIfUserExists(request, response);
};

function checkIfUserExists(request, response) {
    helper.checkUser(request.body.userId).then(result => {
        if (result) {
            chechIfItsAdmin(request, response);
        } else {
            return response.json({ success: false, message: 'User to delete does not exists' });
        };
    });
}

function chechIfItsAdmin(request, response) {
    helper.checkUser(decodedToken.id).then(result => {
        if (result) {
            if (checkAdmin(result.admin)) {
                conn.query(`DELETE FROM Users WHERE id=${request.body.userId}`, (err, rows) => {
                    err ? response.json({ success: false, err, }) : response.json({ success: true, message: 'User deleted' });
                });
            } else {
                return response.json({ success: false, message: 'You are not admin' });
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
            if (err)
                return response.json({ success: false, err, });
            return response.json({
                success: true,
                name: image.name,
                route: route,
                mimetype: image.mimetype,
                size: image.size
            });
        });
    });
}

const checkNewUsers = (newUser) => {
    users.name = newUser.name.toString();
    users.surname = newUser.surname.toString();
    users.password = Buffer.from(newUser.password).toString('base64');
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

module.exports = { getUsers, postUser, deleteUsers, postProfileImage };

