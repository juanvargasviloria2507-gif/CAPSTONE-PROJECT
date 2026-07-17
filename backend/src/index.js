/**
 * Proyecto: Proyecto Integrador - Capstone Project (BACKEND)
 * Autor: Jose Vargas
 * Archivo: index.js
 * Descripción: Punto de entrada del servidor. Conecta las rutas y arranca Express.
 */

const express = require('express');
const app = express();

app.use(express.json());

// Conectar las rutas de autenticación (register y login)
const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});