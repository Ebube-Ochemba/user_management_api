const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userMiddleware = require('../middlewares/userMiddleware')

// Getting all users
router.get("/", userController.getAllUsers)

// Creating one user
router.post("/", userController.createUser)

// Getting one user by name or ID
router.get("/:id?", userMiddleware.getUser, userController.getUserById)

// Updating one user or ID
router.patch("/:id?", userMiddleware.getUser, userController.updateUser)

// Deleting one user or ID
router.delete("/:id?", userMiddleware.getUser, userController.deleteUser)

module.exports = router
