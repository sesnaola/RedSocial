const conn = require('../db/dbConnection');
let users = require('../models/Users');

const getUsers = (request, response, next) => {
    query = "SELECT * FROM Users";
    if (request.query.userId) query = query + ` WHERE ID=${request.query.userId}`;

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
    let check;

    if (!request.body.userId) return response.json({ success: false, message: 'No userId' });
    if (!request.files) return response.json({ success: false, message: 'No file uploaded' });
    if (!request.files.image) return response.json({ success: false, message: 'No image uploaded' });
    if (!request.files.image.mimetype.startsWith('image/jpeg') && !request.files.image.mimetype.startsWith('image/png')) return response.json({ success: false, message: 'Wrong file type' });
    if (request.files.image.size > 1000000) return response.json({ success: false, message: 'File too large' });

    const checkIfUserExists = () => {
        conn.query(`SELECT * FROM Users WHERE ID=${request.body.userId}`, (err, result, rows) => { Object.keys(result).length === 0 ? check = false : check = true; });
        return check;
    }
    check = checkIfUserExists();

    setTimeout(function () {
        if (check === false) {
            return response.json({ success: false, message: 'User not found' });
        } else {
            queryFileUpload(request, response);
        }
    }, 500);
};


function queryFileUpload(request, response) {
    let image = request.files.image;
    route = "user" + request.body.userId + image.name;

    image.mv('./uploads/' + route, (err) => {
        if (err)
            return response.status(500).send(err);

        conn.query(`UPDATE Users SET photo='${route}' WHERE ID=${request.body.userId}`, (err) => {
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
    users.photo = newUser.photo.toString();
    users.admin = checkAdmin(newUser.admin);
    users.creationDate = Math.floor(Date.now() / 1000);
}

const checkAdmin = (value) => {
    value == 1 ? users.admin = 1 : users.admin = 0;
    return users.admin;
}

function mapUsers(value) {
    users = value.map(user => {
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

module.exports = { getUsers, postUser, postProfileImage };
