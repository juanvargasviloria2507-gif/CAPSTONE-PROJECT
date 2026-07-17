/**
 * Project: Capstone Project (BACKEND)
 * File: reviews.controller.js
 * Description: HU7 - Business logic for saving and querying product reviews.
 */

const pool = require('../../db');

// === POST /products/:id/reviews ===
const addReview = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from the token by auth middleware
        const { id: productId } = req.params;
        const { rating, comment } = req.body;

    // check field mandatory
    if (!rating || !comment) {
        return res.status(400).send({ error: 'rating and comment are required' });
    }

    // check range of rating
    if (rating < 1 || rating > 5) {
        return res.status(400).send({ error: 'rating must be between 1 and 5' });
    }

    // confirm product exists
    const [product] = await pool.query('SELECT id FROM products WHERE id = ?', [productId]);
    if (product.length === 0) {
        return res.status(404).send({ error: 'Product not found' });
    }

    const [result] = await pool.query(
        'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
        [userId, productId, rating, comment]
    );
    res.status(201).send({ message: 'Review added successfully', 
        reviewId: result.insertId });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};
// === GET /products/:id/reviews ===
const getProductReviews = async (req, res) => {
    try {
        const { id: productId } = req.params;

        const [rows] = await pool.query(
            `SELECT reviews.id, reviews.rating, reviews.comment,
                   users.id AS userId, users.name AS userName
            FROM reviews
            JOIN users ON reviews.user_id = users.id
            WHERE reviews.product_id = ?
            ORDER BY reviews.id DESC`,
            [productId]
        );
        res.status(200).send(rows);

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
        };
    
};

module.exports = {
    addReview,
    getProductReviews
};