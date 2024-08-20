const User = require('../../../models/userModel')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getUserById = (req, res) => {
    res.json(res.user)
}

exports.createUser = async (req, res) => {
    const user = new User({
        name: req.body.name
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.updateUser = async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: "User deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
