const express = require('express'); //import express
const router = express.Router();
const usersController = require('./../controllers/UsersControllers');

router.get('/users', usersController.getAllUsers);
router.get('/users/:name', usersController.getUser);

module.exports = router;