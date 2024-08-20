const express = require('express')
const router = express.Router()
const User = require('../../../models/userModel')


// Getting all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one user
router.get("/:id", getUser, (req, res) => {
    res.send(res.user)
})

// Creating one user
router.post("/", async (req, res) => {
    const user = new User({
        name: req.body.name
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating One user
router.patch("/:id", getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
        try {
            const updatedUser = await res.user.save()
            res.json(updatedUser)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
})

// Deleting one user
router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: "User deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// middleware function
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}


module.exports = router
