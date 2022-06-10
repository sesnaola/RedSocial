const express = require('express'); //import express
const router = express.Router();
const usersController = require('./../controllers/UsersController');
const authController = require('./../controllers/AuthController');
const postsController = require('./../controllers/PostsController');

router.get('/users', usersController.getUsers);
router.post('/profile-image', usersController.postProfileImage);
router.post('/users', usersController.postUser);
router.post('/login', authController.login);
router.get('/posts', postsController.getPosts);
router.post('/posts', postsController.postPosts);

module.exports = router;