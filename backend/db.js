/**
 * Proyecto: Proyecto Integrador - Capstone Project (BACKEND)
 * Autor: Jose Vargas
 * Archivo: db.js
 * Descripción: Configuración del pool de conexiones a la base de datos MySQL usando variables de entorno.
 */

require("dotenv").config();
const mysql = require('mysql2/promise');

// Creamos el pool de conexiones usando las variables del archivo .env
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;