/**
 * Project: Capstone Project (BACKEND)
 * File: reviews.routes.js
 * Description: Endpoints of product reviews.
 */

const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.controller');
const { verifyToken } = require('../middlewares/auth.middlewares');

router.post('/products/:id/reviews', verifyToken, reviewsController.addReview);
router.get('/products/:id/reviews', reviewsController.getProductReviews); // pública, sin verifyToken

module.exports = router;