/**
 * Project: Capstone Project Backend
 * Author: Jose Vargas
 * File: products.routes.js
 * Description: Router for product listing endpoints.
 */

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/products', productsController.getAllProducts);

router.get('/products/:id', productsController.getProductById);

module.exports = router;