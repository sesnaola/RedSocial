const conn = require('./../db/dbConnection');
let users = require('./../models/Users');

const getAllUsers = (request, response, next) => {
    conn.query("SELECT * FROM Users", (err, rows) => {
        mapUsers(rows);
        err ? response.json({ success: false, err, }) : response.json({ users })
    });
};

const getUser = (request, response, next) => {
    id = request.params.id;
    if (!request) return response.json({ success: false, message: 'No userId' });
    conn.query(`SELECT * FROM Users WHERE ID=${id}`, (err, rows) => {
        mapUsers(rows);
        err ? response.json({ success: false, err, }) : response.json({ users }.users)
    });
};

const login = (request, response, next) => {
    request.body.password = Buffer.from(request.body.password).toString('base64')
    const { mail, password } = request.body;
    if (!mail || !password) return response.json({ success: false, message: 'No email or password' });
    conn.query(`SELECT * FROM Users WHERE mail='${mail}' AND password='${password}'`, (err, rows) => {
        console.log(rows);
        mapUsers(rows);
        err ? response.json({ success: false, err, }) : response.json({ users })
    });
};


const uploadProfileImage = (request, response, next) => {
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

const createUser = (request, response, next) => {
    console.log(request.body);
    checkNewUsers(request.body);
    console.log(users);
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
            // id: user.ID,
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

module.exports = { getAllUsers, getUser, createUser, uploadProfileImage, login };

