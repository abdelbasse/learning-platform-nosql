
const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function getAllUsers(req, res) {
  try {
    // Connect to MongoDB
    const dbInstance = db.getDb();

    // Access the 'students' collection and retrieve all documents
    const studentsCollection = dbInstance.collection('students');
    const students = await studentsCollection.find({}).toArray();

    // Send the result as a response
    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error('Error retrieving students:', error);

    // Handle errors
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve students',
    });
  }
}

module.exports = {
  getAllUsers
};