const conn = require('./../db/dbConnection');

const getAllUsers = (request, response, next) => {
    conn.query("SELECT * FROM Users", (err, rows) => {
        err ? response.json({ success: false, err, }) : response.json({ rows }.rows)
    });
};

const getUser = (request, response, next) => {
    id = request.params.id;
    if (!request) return response.json({ success: false, message: 'No userId' });
    conn.query(`SELECT * FROM Users WHERE ID=${id}`, (err, rows) => {
        err ? response.json({ success: false, err, }) : response.json({ rows }.rows)
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

module.exports = { getAllUsers, getUser, uploadProfileImage };
