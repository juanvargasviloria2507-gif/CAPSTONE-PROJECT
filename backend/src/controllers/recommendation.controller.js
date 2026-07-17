/**
 * Project: Capstone Project Backend
 * File: recommendation.controller.js
 * Description: HU5 - Business logic for the jeans recommendation engine.
 * Queries the real `products` table (with fit_tag, color_tag, style_tag).
 */

const jwt = require('jsonwebtoken');
const pool = require('../../db');

// Try to extract the user_id from the token without failing if it is absent (public quiz)
function getUserIdFromToken(req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1]; // format: "Bearer <token>"
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'firma_secreta_por_defecto');
        return decoded.id || null;
    } catch (error) {
        return null; // invalid/expired token: continue as guest
    }
}

// Calculate a product score based on quiz answers
function scoreProduct(product, answers) {
    let score = 0;

    // ---------- FIT ----------
    if (answers.fit === 'skinny' && product.fit_tag === 'skinny') score += 5;
    if (answers.fit === 'wide' && product.fit_tag === 'wide') score += 5;
    if (answers.fit === 'flare' && product.fit_tag === 'flare') score += 5;
    if (answers.fit === 'shorts' && product.fit_tag === 'shorts') score += 5;

    // ---------- COLOR ----------
    if (answers.color === 'any') {
        score += 1;
    } else if (product.color_tag === answers.color) {
        score += 3;
    }

    // ---------- STYLE ----------
    if (product.style_tag === answers.style) score += 3;

    return score;
}

// === POST /recommendations ===
const getRecommendation = async (req, res) => {
    try {
        const { fit, color, style } = req.body;

        // Validate required quiz answers
        if (!fit || !color || !style) {
            return res.status(400).send({ error: 'fit, color and style are required' });
        }

        // 1. Fetch the actual catalog from the DB
        const [products] = await pool.query(
            'SELECT id, name, image, price, description, fit_tag, color_tag, style_tag FROM products'
        );

        // 2. Apply recommendation logic
        const scored = products
            .map((product) => ({ ...product, matchScore: scoreProduct(product, { fit, color, style }) }))
            .filter((product) => product.matchScore > 0)
            .sort((a, b) => b.matchScore - a.matchScore);

        if (scored.length === 0) {
            return res.status(404).send({ error: 'No matching product found for these answers' });
        }

        const recommendations = scored.slice(0, 3);
        const topMatch = recommendations[0];

        // 3. Save the user's answers (and the winning product)
        const userId = getUserIdFromToken(req);

        await pool.query(
            `INSERT INTO recommendations (user_id, fit_answer, color_answer, style_answer, recommended_product_id)
             VALUES (?, ?, ?, ?, ?)`,
            [userId, fit, color, style, topMatch.id]
        );

        // 4. Return the recommended product (top 3 for the frontend grid)
        res.status(200).send({
            message: 'Recommendation generated successfully',
            recommendations
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = {
    getRecommendation
};