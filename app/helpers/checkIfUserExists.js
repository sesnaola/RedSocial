const conn = require('../db/dbConnection');

function checkUser(id) {

    let check;
    return new Promise((resolve, reject) => {

        conn.query(`SELECT * FROM Users WHERE id=${id}`, (err, result, rows) => {
            Object.keys(result).length === 0 ? check = false : check = true;
            if (check === true) {
                resolve(result[0]);
            } else {
                resolve(false);
            }
        });
    });
}

module.exports = { checkUser }