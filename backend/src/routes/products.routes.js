/**
 * Proyecto: Proyecto Integrador - Capstone Project (BACKEND)
 * Autor: Jose Vargas
 * Archivo: products.routes.js
 * Descripción: Enrutador para el listado de productos.
 */

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', productsController.getProductById);

module.exports = router;