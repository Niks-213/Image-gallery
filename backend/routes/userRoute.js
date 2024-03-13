const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

// Route for creating a new user
router.post('/', userController.createUser);

// Route for getting all users
router.get('/', userController.getAllUsers);

// Route for updating a user by ID
router.put('/:id', userController.updateUserById);

// Route for deleting a user by ID
router.delete('/:id', userController.deleteUserById);

// Route for getting a user by ID
router.get('/:id', userController.getUserById);

module.exports = router;
