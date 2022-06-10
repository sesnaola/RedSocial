const express = require('express'); //import express
const router = express.Router();
const usersController = require('./../controllers/UsersController');
const authController = require('./../controllers/AuthController');
const postsController = require('./../controllers/PostsController');

router.get('/users', usersController.getUsers);
router.post('/users', usersController.postUser);
router.put('/users', usersController.putUser);
router.delete('/users', usersController.deleteUsers);
router.post('/profile-image', usersController.postProfileImage);
router.get('/posts', postsController.getPosts);
router.post('/posts', postsController.postPosts);
router.post('/login', authController.login);

module.exports = router;