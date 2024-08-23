const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userMiddleware = require('../middlewares/userMiddleware')

// Getting all users
router.get("/", userController.getAllUsers)

// Creating one user
router.post("/", userController.createUser)

// Getting one user by ID
router.get("/:id", userMiddleware.getUser, userController.getUserById)

// Updating one user by ID
router.patch("/:id", userMiddleware.getUser, userController.updateUser)

// Deleting one user by ID
router.delete("/:id", userMiddleware.getUser, userController.deleteUser)

module.exports = router
