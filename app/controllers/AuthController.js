const conn = require('./../db/dbConnection');
const jwt = require('jsonwebtoken');

const login = (request, response, next) => {
    if (!request.body.password) {
        return response.status(400).json({ success: false, message: 'Please enter password' });
    }
    if (!request.body.mail) {
        return response.status(400).json({ success: false, message: 'Please enter mail' });
    }
    conn.query(`SELECT * FROM Users WHERE mail = '${request.body.mail}'`,
        (err, result) => {
            if (err) {
                throw err;
                return response.status(400).send({
                    msg: err
                });
            }
            if (!result.length) {
                return response.status(401).send({
                    msg: 'Mail or password is incorrect!'
                });
            }
            encryptedRequestPassword = request.body.password
            if (encryptedRequestPassword === result[0].password) {
                // return response.status(200).json({ success: true, message: 'Welcome' });
                const token = jwt.sign({
                    id: result[0].id,
                    mail: result[0].mail,
                    password: result[0].password
                }, 'secret', { expiresIn: '1h' });
                return response.status(200).send({
                    token: token,
                    user: {
                        id: result[0].id,
                        mail: result[0].mail,
                        password: result[0].password
                    }
                });
            } else {
                return response.status(401).send({
                    msg: 'Mail or password is incorrect!'
                });
            }
        }
    );
};


module.exports = { login };

