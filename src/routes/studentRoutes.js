const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Routes pour les cours
router.get('/', studentController.getAllUsers);

module.exports = router;