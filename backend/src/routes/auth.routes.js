/**
 * Project: Capstone Project Backend
 * Author: Jose Vargas
 * File: auth.routes.js
 * Description: Router mapping HTTP requests to authentication controllers.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); // Imports the authentication controller

// Define endpoints for registration and login
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;