# Backend - Capstone Project

## Description

This backend exposes the API for the Capstone project to handle user authentication, product catalog management, quiz-based recommendations, and favorites protected with JWT.

## Technologies

- Node.js
- Express
- MySQL (mysql2)
- bcrypt
- jsonwebtoken
- dotenv

## Prerequisites

- Node.js 18 or higher
- MySQL Server running
- A MySQL client such as MySQL Workbench or the terminal

## Installation

1. Go to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create the database and the required tables in MySQL.

Basic example:
```sql
CREATE DATABASE CAPSTONE_PROJECT;
USE CAPSTONE_PROJECT;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(70),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(60)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    image VARCHAR(255),
    price DECIMAL(10,2),
    fit_tag VARCHAR(50),
    color_tag VARCHAR(50),
    style_tag VARCHAR(50)
);

CREATE TABLE product_sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    size VARCHAR(20)
);

CREATE TABLE recommendations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    fit_answer VARCHAR(50),
    color_answer VARCHAR(50),
    style_answer VARCHAR(50),
    recommended_product_id INT
);

CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_product (user_id, product_id)
);
```

4. Create the `.env` file inside the `backend` folder with the connection and JWT variables:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=CAPSTONE_PROJECT
PORT=3000
JWT_SECRET=your_secret_key
```

## Run the server

```bash
node src/index.js
```

If the configuration is correct, the server will display something similar to:
```bash
server running on port 3000
```

## Available Endpoints

### Authentication

#### POST /register
Registers a new user.

Body:
```json
{
  "name": "Maria",
  "email": "maria@example.com",
  "password": "123456"
}
```

Successful response (201):
```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

#### POST /login
Logs in and returns a JWT token.

Body:
```json
{
  "email": "maria@example.com",
  "password": "123456"
}
```

Successful response (200):
```json
{
  "message": "Login successful!",
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "Maria",
    "email": "maria@example.com"
  }
}
```

### Products

#### GET /products
Returns all products.

#### GET /products/:id
Returns a product by its ID, including its sizes.

### Recommendations

#### POST /recommendations
Receives quiz answers and returns product recommendations.

Body:
```json
{
  "fit": "skinny",
  "color": "blue",
  "style": "casual"
}
```

### Favorites

These routes are protected with JWT through the `verifyToken` middleware.

#### POST /favorites
Adds a product to the authenticated user's favorites.

Body:
```json
{
  "productId": 1
}
```

#### DELETE /favorites/:productId
Removes a product from the authenticated user's favorites.

#### GET /favorites
Lists the authenticated user's favorite products.

## Usage Notes

Before testing the API, make sure that:
- MySQL is running.
- The `.env` file exists with the correct values.
- The dependencies have been installed with `npm install`.
- The required database and tables have been created.
