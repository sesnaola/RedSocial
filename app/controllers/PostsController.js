const { query } = require('express');
const conn = require('./../db/dbConnection');
let posts = require('./../models/PostsModel');


const getPosts = (request, response, next) => {
    let postType = request.params.postType;
    let userId = request.params.userId;
    let amount = request.params.amount;

    let query = generateQuery(postType, userId, amount);

    conn.query(query, (err, rows) => {
        mapPosts(rows);
        err ? response.json({ success: false, err, }) : response.json({ posts })
    });

}

function generateQuery(postType, userId, amount) {
    let { queryPostType, queryUserId, queryAmount } = arrangeParameters(postType, userId, amount);
    let query = arrangeQuery(queryPostType, queryUserId, queryAmount, postType, userId, amount);
    return query;
}

function arrangeParameters(postType, userId, amount) {
    let queryPostType = postType ? `postType="${postType}"` : '';
    let queryUserId = userId ? `userId="${userId}"` : '';
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

module.exports = { getPosts };
