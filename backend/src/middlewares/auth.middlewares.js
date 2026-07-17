/**
 * Project: Capstone Project (BACKEND)
 * File: auth.middleware.js
 * Description: Middleware for protecting routes that require a logged-in user.
 */

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).send({ error: 'Malformed token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'firma_secreta_por_defecto');
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).send({ error: 'Invalid or expired token' });
    }
}

module.exports = { verifyToken };