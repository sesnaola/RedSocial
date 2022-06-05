const express = require('express'); //import express
const router = express.Router();
const usersController = require('./../controllers/UsersControllers');

router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUser);
router.post('/users', usersController.createUser);

module.exports = router;