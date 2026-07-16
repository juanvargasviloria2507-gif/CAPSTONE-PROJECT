/**
 * Endpoint de registro de usuarios (POST /register)
 * Autor: Jose Vargas
 * Proyecto: Capstone Project - Backend
 */

// ==== IMPORTACIONES ====
const express = require('express');       // Framework para crear el servidor y las rutas
const bcrypt = require('bcrypt');          // Libreria para encriptar contrasenas

const app = express();

// Middleware: permite que Express interprete automaticamente
// los bodies de las peticiones que vengan en formato JSON
app.use(express.json());

const PORT = 3000;

// ==== RUTA: REGISTRO DE USUARIO ====
app.post('/register', async (req, res) => {

    // Extraemos los datos enviados por el cliente en el body de la peticion
    const { name, email, password } = req.body;

    // 1. VALIDACION: verificar que ningun campo obligatorio venga vacio
    if (!name || !email || !password) {
        return res.status(400).send({ 'error': 'missing required fields' });
    }

    // 2. VERIFICAR CORREO DUPLICADO
    // Se usa "?" como placeholder para evitar SQL Injection
    // (nunca se concatena el valor del usuario directamente en el SQL)
    const [rows] = await pool.query('SELECT email FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
        return res.status(400).send({ 'error': 'email already exists' });
    }

    // 3. ENCRIPTAR LA CONTRASENA
    // El segundo argumento (10) son los "salt rounds": cuantas veces se
    // procesa el hash internamente. Mas rounds = mas seguro, pero mas lento.
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. GUARDAR EL USUARIO EN LA BASE DE DATOS
    // Se guarda la contrasena ya encriptada (hashedPassword), nunca la original
    const [result] = await pool.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
    );

    // 5. RESPUESTA DE EXITO
    // Codigo 201 = se creo un recurso nuevo (el usuario)
    // No se devuelve la contrasena, ni siquiera encriptada
    res.status(201).send({
        message: 'User registered successfully',
        userId: result.insertId
    });
});

// ==== INICIAR EL SERVIDOR ====
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

// ==== CONEXION A LA BASE DE DATOS ====
const pool = require('./db');

// Prueba rapida de conexion (puedes quitar este bloque mas adelante)
pool.query('SELECT 1')
    .then(() => console.log('Conexion a MySQL exitosa'))
    .catch((err) => console.error('Error de conexion:', err.message));