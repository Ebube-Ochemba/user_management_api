// Environmentals
require('dotenv').config()

// Imports
const express = require('express')
const db = require('./config/db')
const userRouter = require('./api/v1/routes/users')

// App setup
const app = express()
const port = process.env.PORT || 3001

// Middleware to accept JSON in requests
app.use(express.json())

// Routes
app.use('/', userRouter)


// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})


module.exports = app
