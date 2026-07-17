/**
 * Project: Capstone Project Backend
 * Author: Jose Vargas
 * File: index.js
 * Description: Server entry point. Connects routes and starts Express.
 */

const express = require('express');
const app = express();

app.use(express.json());

app.use('/images', express.static('public/images'));

// Connect authentication routes (register and login)
const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

const productsRoutes = require('./routes/products.routes');
app.use('/', productsRoutes);

const recommendationRoutes = require('./routes/recommendation.routes');
app.use('/', recommendationRoutes);

const favoritesRoutes = require('./routes/favorites.routes');
app.use('/', favoritesRoutes);

const reviewsRoutes = require('./routes/reviews.routes');
app.use('/', reviewsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});