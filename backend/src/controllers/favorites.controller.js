/**
 * Project: Capstone Project (BACKEND)
 * Files: favorites.controller.js
 * Description: Business logic for adding, removing, and listing favorites.
 */

const pool = require('../../db');

// === POST /favorites ===

const addFavorite = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from the token by auth middleware
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).send({ error: 'productId is required' });
        }

        // Check if the product exists
        const [product] = await pool.query('SELECT id FROM products WHERE id = ?', [productId]);
        if (product.length === 0) {
            return res.status(404).send({ error: 'Product not found' });
        }

        // Idempotent: if already exists, it neither duplicates nor crashes
        await pool.query('INSERT IGNORE INTO favorites (user_id, product_id) VALUES (?, ?)', [userId, productId]);

        res.status(201).send({ message: 'Product added to favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

// === DELETE /favorites/:productId ===
const removeFavorite = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from the token by auth middleware
        const { productId } = req.params;

        const [result] = await pool.query('DELETE FROM favorites WHERE user_id = ? AND product_id = ?', [userId, productId]);

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Favorite not found' });
        }

        res.status(200).send({ message: 'Product removed from favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

// === GET /favorites ===
const getFavorites = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from the token by auth middleware

        const [rows] = await pool.query(
            `SELECT products.id, products.name, products.image, products.price, products.description, products.fit_tag
            FROM favorites
            JOIN products ON favorites.product_id = products.id
            WHERE favorites.user_id = ?
            ORDER BY favorites.created_at DESC`,
            [userId]
        );

        res.status(200).send({ favorites: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = {
    addFavorite,
    removeFavorite,
    getFavorites
};