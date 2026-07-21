/**
 * Project: Capstone Project Backend
 * Author: Jose Vargas
 * File: products.controller.js
 * Description: Controller that handles product listing logic.
 */

const pool = require('../../db');

const getAllProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, description, image, price, fit_tag FROM products');
        res.status(200).send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            `SELECT 
                products.name,
                products.description,
                products.image,
                products.price,
                product_sizes.size
            FROM products
            JOIN product_sizes ON products.id = product_sizes.product_id
            WHERE products.id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).send({ error: 'Product not found' });
        }

        // Group sizes into an array, using the other product data from the first row
        const product = {
            name: rows[0].name,
            description: rows[0].description,
            image: rows[0].image,
            price: rows[0].price,
            sizes: rows.map(row => row.size)
        };

        res.status(200).send(product);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};
module.exports = {
    getAllProducts
};
