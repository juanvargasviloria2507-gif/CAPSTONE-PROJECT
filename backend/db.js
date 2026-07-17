/**
 * Project: Capstone Project Backend
 * Author: Jose Vargas
 * File: db.js
 * Description: MySQL connection pool configuration using environment variables.
 */

require("dotenv").config();
const mysql = require('mysql2/promise');

// Create the connection pool using values from the .env file
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;