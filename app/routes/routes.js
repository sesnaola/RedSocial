const express = require('express'); //import express
const router = express.Router();
const usersController = require('./../controllers/UsersControllers');
const authController = require('./../controllers/AuthController');
const postsController = require('./../controllers/PostsController');


// UsersControllers
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUser);
router.post('/users', usersController.createUser);

// AuthController
router.post('/login', authController.login);

// PostsController
router.get('/posts', postsController.getPosts);


module.exports = router;