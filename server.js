require('dotenv').config()

const express = require('express')
const db = require('./config/db')
const app = express()
const port = process.env.PORT || 3001

app.use(express.json()) // Middleware to accept JSON in requests

const userRouter = require('./api/v1/routes/users')
app.use('/', userRouter)


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})


module.exports = app
