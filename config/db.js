// connectMongoose.js
const mongoose = require('mongoose');

// MongoDB connection URI from environment variable
const uri = process.env.DATABASE_URL;

// Mongoose connection setup
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB with Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB with Mongoose:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
