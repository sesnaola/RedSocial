const { query } = require('express');
const conn = require('./../db/dbConnection');
let posts = require('./../models/Posts');
let helper = require('./../helpers/checkIfUserExists');


const getPosts = (request, response, next) => {
    let postType = request.query.postType;
    let userId = request.query.userId;
    let amount = request.query.amount;

    let query = generateQuery(postType, userId, amount);

    conn.query(query, (err, rows) => {
        mapPosts(rows);
        err ? response.json({ success: false, err, }) : response.json({ posts })
    });

}

const postPosts = (request, response, next) => {

    if (!request.body.userId) { return response.json({ success: false, message: 'No userId provided' }); }
    checkNewPosts(request.body);
    fileToUpload = request.files;
    if (fileToUpload) { fileToUpload = request.files.file; checkFileType(); }

    helper.checkUser(request.body.userId).then(result => {
        if (result) {
            selectQueryOption(response);
        } else {
            response.json({ success: false, message: 'User does not exist' });
        }
    });
}

const checkNewPosts = (post) => {
    posts.userId = post.userId;
    posts.creationDate = Math.floor(Date.now() / 1000);;
    posts.text = post.text;
    posts.postType = post.postType;
}

function checkFileType() {
    if (fileToUpload.mimetype.startsWith('image/jpeg') || fileToUpload.mimetype.startsWith('image/png')) { posts.postType = 'image'; }
    if (fileToUpload.mimetype.startsWith('video/mp4')) { posts.postType = 'video'; }
    if (fileToUpload.mimetype.startsWith('audio/mp3') || fileToUpload.mimetype.startsWith('audio/mpeg')) { posts.postType = 'audio'; }
}

function selectQueryOption(response) {
    if (fileToUpload) {
        postWithFile(response);
    } else {
        postOnlyText(response);
    }
}

function postWithFile(response) {
    posts.path = 'post' + posts.postType + '-' + posts.userId + '-' + fileToUpload.name;
    fileToUpload.mv('./uploads/' + posts.path, (err) => {
        if (err) {
            return response.status(500).send(err);
        } else {
            conn.query(`INSERT INTO Posts (userId, postType, path, creationDate, text)
                        VALUES ('${posts.userId}',
                                '${posts.postType}',
                                '${posts.path}',
                                '${posts.creationDate}',
                                '${posts.text}')`,
                (err, rows) => {
                    err ? response.json({ success: false, err, }) : response.json({
                        success: true,
                        name: fileToUpload.name,
                        route: posts.path,
                        mimetype: fileToUpload.mimetype,
                        size: fileToUpload.size
                    });
                });
        }
    });
}

function postOnlyText(response) {
    posts.postType = "text";
    posts.path = undefined;
    if (posts.text === undefined) {
        response.json({ success: false, message: 'No text provided' });
    } else {
        conn.query(`INSERT INTO Posts (userId, postType, path, creationDate, text)
            VALUES ('${posts.userId}',
                    '${posts.postType}',
                    '${posts.path}',
                    '${posts.creationDate}',
                    '${posts.text}')`,
            (err, rows) => {
                err ? response.json({ success: false, err, }) : response.json({
                    success: true,
                    text: posts.text
                });
            });
    }
}

function generateQuery(postType, userId, amount) {
    let { queryPostType, queryUserId, queryAmount } = arrangeParameters(postType, userId, amount);
    let query = arrangeQuery(queryPostType, queryUserId, queryAmount, postType, userId, amount);
    return query;
}

function arrangeParameters(postType, userId, amount) {
    let queryPostType = postType ? `postType = "${postType}"` : '';
    let queryUserId = userId ? `userId = "${userId}"` : '';
    let queryAmount = amount ? `LIMIT ${amount}` : '';
    return { queryPostType, queryUserId, queryAmount };
}

function arrangeQuery(queryPostType, queryUserId, queryAmount, postType, userId, amount) {
    let query = 'SELECT * FROM Posts WHERE ' + queryPostType + ' AND ' + queryUserId + queryAmount;

    if (postType == undefined && userId == undefined && amount == undefined) { query = 'SELECT * FROM Posts'; }
    if (postType == undefined && userId == undefined) { query = query.replace('WHERE', ''); }
    if (postType == undefined || userId == undefined) { query = query.replace('AND', ''); }
    return query;
}

function mapPosts(rows) {
    posts = rows.map(post => {
        return {
            id: post.id,
            userId: post.userId,
            postType: post.postType,
            path: post.path,
            creationDate: post.creationDate,
            text: post.text
        };
    });
}

module.exports = { getPosts, postPosts };
