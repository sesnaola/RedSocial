const Posts = (post) => {
    post.id = String;
    post.userId = String;
    post.postType = String;
    post.path = String;
    post.creationDate = String;
    post.text = String;
}

module.exports = { Posts }