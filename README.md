# The Ideal Option

The Ideal Option is a full-stack e-commerce demo focused on jeans and gift-style shopping. The project combines a frontend single-page application with a Node.js + Express backend connected to MySQL for authentication, products, recommendations, favorites, and reviews.

## Overview

This project is organized into two main parts:

- Frontend: a SPA built with plain HTML, CSS, and vanilla JavaScript.
- Backend: a REST API built with Express and MySQL.

The app allows users to browse products, filter by category, view details, add items to the cart, save favorites, log in or register, and take a quiz to receive product recommendations.

## Main features

### Frontend
- Hash-based SPA navigation for home, categories, product detail, cart, favorites, login, and quiz.
- Product catalog with filtering by fit and style.
- Shopping cart with live counter and total.
- Favorites section with per-user persistence.
- Login and registration flow.
- Quiz-based product recommendations.
- Review section on product pages.

### Backend
- User registration and login with password hashing.
- JWT-based authentication for protected routes.
- Product retrieval endpoints.
- Recommendation engine based on quiz answers.
- Favorites management for authenticated users.
- Product reviews storage and retrieval.

## Project structure

```text
CAPSTONE_PROJECT/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── auth.js
│   ├── cart.js
│   ├── data.js
│   ├── favorites.js
│   ├── main.js
│   ├── reviews.js
│   ├── router.js
│   └── views/
│       ├── cart.js
│       ├── favorites.js
│       ├── home.js
│       ├── login.js
│       ├── product.js
│       └── quiz.js
├── assets/
│   ├── README.txt
│   └── products/
└── backend/
    ├── db.js
    ├── package.json
    ├── public/
    │   └── images/
    └── src/
        ├── controllers/
        ├── middlewares/
        ├── routes/
        └── index.js
```

## Technologies used

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Backend
- Node.js
- Express
- MySQL (mysql2)
- bcrypt
- jsonwebtoken
- dotenv

## Running the frontend

You can run the frontend in two simple ways:

1. Open the file directly in the browser:
   - Double-click on index.html

2. Serve the folder locally:
   ```bash
   npx serve .
   ```
   Or:
   ```bash
   python3 -m http.server 8000
   ```

Then open:
```text
http://localhost:8000
```

## Running the backend

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure the environment
Create a .env file inside the backend folder with the following variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=CAPSTONE_PROJECT
PORT=3000
JWT_SECRET=your_secret_key
```

### 3. Create the MySQL database and tables
A typical setup includes tables for users, products, product_sizes, recommendations, favorites, and reviews.

### 4. Start the server
```bash
node src/index.js
```

If everything is configured correctly, the server will run on port 3000.

## Backend API endpoints

### Authentication
- POST /register
- POST /login

### Products
- GET /products
- GET /products/:id

### Recommendations
- POST /recommendations

### Favorites (protected with JWT)
- POST /favorites
- DELETE /favorites/:productId
- GET /favorites

### Reviews
- POST /products/:id/reviews
- GET /products/:id/reviews

## Notes

- The frontend demo uses local browser storage for some features, while the backend uses a real database for users and product-related data.
- This project is intended as a capstone/demo application and should be adapted before using it for production environments.
