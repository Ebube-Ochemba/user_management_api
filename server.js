require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')


const app = express();
const port = 3000;

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


app.use(express.json())  // Accept JSON in requests

const userRouter = require('./api/v1/routes/users')
app.use('/users', userRouter)


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
