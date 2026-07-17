/**
 * Proyecto: Proyecto Integrador - Capstone Project (BACKEND)
 * Autor: Jose Vargas
 * Archivo: products.controller.js
 * Descripción: Controlador que maneja la lógica para obtener el listado de productos.
 */

const pool = require('../../db');

const getAllProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT name, image, price FROM products');
        res.status(200).send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllProducts
};