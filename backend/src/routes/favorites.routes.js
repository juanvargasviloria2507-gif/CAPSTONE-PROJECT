/**
 * Project: Capstone Project (BACKEND)
 * Files: favorites.routes.js
 * Description: Endpoints of favorites (protected with JWT).
 */


const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites.controller');
const { verifyToken } = require('../middlewares/auth.middlewares');

router.post('/favorites', verifyToken, favoritesController.addFavorite);
router.delete('/favorites/:productId', verifyToken, favoritesController.removeFavorite);
router.get('/favorites', verifyToken, favoritesController.getFavorites);

module.exports = router;
