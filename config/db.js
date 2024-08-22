// connectMongoose.js
const mongoose = require('mongoose');

// MongoDB connection URI from environment variable
const uri = process.env.DATABASE_URL;

// Mongoose connection setup
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB with Mongoose'))
  .catch((error) => console.error('Error connecting to MongoDB with Mongoose:', error));

const db = mongoose.connection

// Export the connection for use in other modules
module.exports = db;
