/**
 * Proyecto: Proyecto Integrador - Capstone Project (BACKEND)
 * Autor: Jose Vargas
 * Archivo: auth.controller.js
 * Descripción: Controlador que maneja la lógica de negocio para el registro y login de usuarios.
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../db'); // Sube dos niveles para encontrar db.js en la raíz

// === REGISTRO DE USUARIO ===
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validar campos obligatorios
        if (!name || !email || !password) {
            return res.status(400).send({ 'error': 'missing required fields' });
        }

        // Verificar correo duplicado
        const [rows] = await pool.query('SELECT email FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).send({ 'error': 'email already exists' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar en la base de datos
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.status(201).send({
            message: 'User registered successfully',
            userId: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

// === INICIO DE SESIÓN ===
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar que no vengan vacíos
        if (!email || !password) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        // Buscar al usuario en la base de datos
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const user = rows[0];

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        // Generar JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET || 'firma_secreta_por_defecto', 
            { expiresIn: '2h' }
        );

        // Retornar información
        res.status(200).send({ 
            message: 'Login successful!',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = {
    register,
    login
};