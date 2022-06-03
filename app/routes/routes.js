const express = require('express'); //import express
const router = express.Router();
const usersController = require('./../controllers/UsersControllers');
const postsController = require('./../controllers/PostsController');

router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUser);
router.get('/posts', postsController.getPosts);

module.exports = router;