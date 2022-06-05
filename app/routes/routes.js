const express = require('express'); //import express
const router = express.Router();
const usersController = require('./../controllers/UsersControllers');
const authController = require('./../controllers/AuthController');

router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUser);
router.post('/login', authController.login);

module.exports = router;