const User = require('../../../models/userModel')

exports.getUser = async (req, res, next) => {
    let user
    try {
        if (req.params.id) {
            // Find user by ID
            user = await User.findById(req.params.id)
        }

        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}
