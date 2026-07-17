# Backend - Capstone Project

## Description

This backend exposes the API for the Capstone project. It supports user registration and login, product listing, quiz-based recommendations, favorites, and product reviews.

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

Example:
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

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT NOT NULL
);
```

4. Create the `.env` file inside the `backend` folder with the connection and JWT settings:
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

If everything is configured correctly, the server will start and print:
```bash
server running on port 3000
```

## Project Structure

```text
backend/
├── db.js
├── package.json
├── public/
│   └── images/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── favorites.controller.js
│   │   ├── products.controller.js
│   │   ├── recommendation.controller.js
│   │   └── reviews.controller.js
│   ├── middlewares/
│   │   └── auth.middlewares.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── favorites.routes.js
│   │   ├── products.routes.js
│   │   ├── recommendation.routes.js
│   │   └── reviews.routes.js
│   └── index.js
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
Returns a product by its ID, including its available sizes.

### Recommendations

#### POST /recommendations
Receives quiz answers and returns a list of recommended products.

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
Returns the authenticated user's favorite products.

### Reviews

#### POST /products/:id/reviews
Adds a review to a product. Requires authentication.

Body:
```json
{
  "rating": 5,
  "comment": "Great product"
}
```

#### GET /products/:id/reviews
Returns all reviews for a specific product.

## Usage Notes

Before testing the API, make sure that:
- MySQL is running.
- The `.env` file exists with the correct values.
- The dependencies were installed with `npm install`.
- The required database and tables have been created.
