const express = require('express'); //import express
const router = express.Router();
const usersController = require('./../controllers/UsersControllers');
const authController = require('./../controllers/AuthController');
const postsController = require('./../controllers/PostsController');


router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUser);
router.post('/profile-image', usersController.uploadProfileImage);
router.post('/users', usersController.createUser);
router.post('/login', authController.login);
router.get('/posts', postsController.getPosts);

module.exports = router;