const conn = require('./../db/dbConnection');
let users = require('./../models/Users');

const getAllUsers = (request, response, next) => {
    conn.query("SELECT * FROM Users", (err, rows) => {
        err ? response.json({ success: false, err, }) : response.json({ rows }.rows)
    });
};

const getUser = (request, response, next) => {
    id = request.params.id
    conn.query(`SELECT * FROM Users WHERE ID=${id}`, (err, rows) => {
        err ? response.json({ success: false, err, }) : response.json({ rows }.rows)
    });
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

// function mapUsers(value) {
//     users = value.map(user => {
//         return {
//             // id: user.ID,
//             name: user.name,
//             surname: user.surname,
//             password: user.password,
//             mail: user.mail,
//             photo: user.photo,
//             admin: user.admin,
//             creationDate: user.creationDate
//         };
//     });
// }

module.exports = { getAllUsers, getUser, createUser };
