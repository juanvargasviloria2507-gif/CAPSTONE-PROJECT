/**
 * Proyecto: Proyecto Integrador - Capstone Project (BACKEND)
 * Autor: Jose Vargas
 * Archivo: auth.routes.js
 * Descripción: Enrutador que mapea las peticiones HTTP a sus respectivos controladores.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); // Importa el controlador de autenticación

// Definición de endpoints para registro y login
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;