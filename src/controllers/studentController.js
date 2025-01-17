
const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function getAllUsers(req, res) {
  try {
    const dbInstance = db.getDb();
    const studentsCollection = dbInstance.collection('students');
    const students = await studentsCollection.find({}).toArray();

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error('Error retrieving students:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve students',
    });
  }
}

module.exports = {
  getAllUsers
};