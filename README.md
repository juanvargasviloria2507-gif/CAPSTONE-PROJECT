# The Ideal Option

The Ideal Option is a full-stack e-commerce application focused on jeans and gift-style shopping. The project combines a responsive single-page application (SPA) with a robust Node.js + Express backend connected to MySQL. It demonstrates modern web development practices with user authentication, product recommendations, shopping cart functionality, and customer reviews.

## Overview

This capstone project is organized into two main components:

- **Frontend**: A responsive SPA built with plain HTML5, CSS3, and vanilla JavaScript, featuring hash-based routing and dynamic content rendering.
- **Backend**: A REST API built with Express.js and MySQL, handling authentication, product management, recommendations, and user preferences.

The application allows users to browse a curated product catalog, filter by category and style, manage shopping carts, save favorite items, register and log in securely, receive personalized product recommendations through an interactive quiz, and read/write product reviews.

## Key Features

### Frontend
- **Navigation**: Hash-based SPA routing with views for home, categories, product details, cart, favorites, authentication, and product recommendations.
- **Product Browsing**: Catalog with dynamic filtering by fit (e.g., skinny, wide leg) and style categories.
- **Shopping Cart**: Real-time cart management with item counters, totals, and local storage persistence.
- **Favorites System**: User-specific saved items with persistent storage for authenticated users.
- **Authentication**: Complete login and registration flow with secure credential handling.
- **Recommendation Engine**: Interactive quiz that generates personalized product recommendations based on user preferences.
- **Reviews**: Customer reviews section on product detail pages with author information and ratings.
- **Responsive Design**: Custom CSS styling using design tokens (color palette, typography) for consistent UI/UX.

### Backend
- **User Management**: Secure registration and login endpoints with bcrypt password hashing.
- **Authentication**: JWT (JSON Web Tokens) for protecting routes and managing user sessions.
- **Product Management**: API endpoints for retrieving products and product details.
- **Recommendation System**: Algorithm-based product recommendations generated from quiz responses.
- **Favorites Management**: Endpoints for authenticated users to save, retrieve, and remove favorite items.
- **Reviews System**: Full CRUD operations for product reviews tied to user accounts.
- **Database Integration**: MySQL database for persistent data storage with proper schema design.
- **CORS Support**: Cross-Origin Resource Sharing enabled for frontend-backend communication.
- **Static File Serving**: Public image serving for product and promotional content.

## Project Structure

```
CAPSTONE_PROJECT/
├── index.html                 # Main HTML entry point
├── README.md                  # Project documentation
├── css/
│   └── styles.css            # Global styles and design tokens
├── js/                        # Frontend application logic
│   ├── auth.js               # Authentication utilities
│   ├── cart.js               # Shopping cart management
│   ├── data.js               # Data utilities and helpers
│   ├── favorites.js          # Favorites management
│   ├── main.js               # Main application initialization
│   ├── reviews.js            # Reviews handling
│   ├── router.js             # Hash-based routing system
│   └── views/                # View components (one file per page)
│       ├── cart.js
│       ├── favorites.js
│       ├── home.js
│       ├── login.js
│       ├── product.js
│       └── quiz.js
├── assets/                    # Static assets
│   └── hero.jpeg             # Hero image for homepage
└── backend/                   # Express API server
    ├── db.js                 # Database connection configuration
    ├── package.json          # Backend dependencies and metadata
    ├── public/
    │   └── images/           # Product and promotional images
    └── src/
        ├── index.js          # Server entry point and route registration
        ├── controllers/      # Business logic for each feature
        │   ├── auth.controller.js
        │   ├── favorites.controller.js
        │   ├── products.controller.js
        │   ├── recommendation.controller.js
        │   └── reviews.controller.js
        ├── middlewares/      # Express middleware
        │   └── auth.middlewares.js
        └── routes/           # API endpoint definitions
            ├── auth.routes.js
            ├── favorites.routes.js
            ├── products.routes.js
            ├── recommendation.routes.js
            └── reviews.routes.js
```

## Technologies Used

### Frontend Stack
- **HTML5**: Semantic markup and structured content
- **CSS3**: Advanced styling with custom properties (variables) and responsive design
- **Vanilla JavaScript**: No frameworks; pure ES6+ for DOM manipulation and client-side logic
- **Google Fonts**: Fraunces (serif) and Inter (sans-serif) for typography
- **Local Storage API**: Client-side data persistence for cart and favorites

### Backend Stack
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MySQL**: Relational database management system
- **mysql2**: MySQL driver for Node.js
- **bcrypt**: Password hashing and security
- **jsonwebtoken (JWT)**: User authentication and session management
- **dotenv**: Environment variable management
- **CORS**: Cross-Origin Resource Sharing middleware

### Development & Deployment Tools
- **MySQL Workbench**: Database administration and visual schema design
- **Thunder Client**: API testing and debugging for backend endpoints
- **Railway**: Cloud deployment platform for hosting the backend server
- **Draw.io**: Architecture and database diagram design for planning

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL server running locally or remotely
- Environment variables configured

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=ideal_option
   JWT_SECRET=your_jwt_secret_key
   ```

4. Initialize the MySQL database and tables (refer to backend documentation for schema)

5. Start the backend server:
   ```bash
   node src/index.js
   ```
   The server will run on `http://localhost:3000`

### Frontend Setup
No installation needed—the frontend is pure HTML, CSS, and JavaScript. Choose one of the following methods:

#### Option 1: Open directly in browser
- Double-click `index.html` to open it directly in your default browser

#### Option 2: Use a local server
With npm:
```bash
npx serve .
```

With Python:
```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Usage

1. **Browse Products**: Visit the home page to see all available jeans or filter by category (Skinny, Wide Leg, etc.)

2. **View Product Details**: Click on any product to see full details, reviews, and related information

3. **Shopping Cart**: Add items to your cart and view the cart summary at any time

4. **User Account**: Register a new account or log in with existing credentials

5. **Favorites**: Save your favorite items (requires login) for quick access later

6. **Get Recommendations**: Take the interactive quiz to receive personalized product recommendations

7. **Leave Reviews**: Share your thoughts on products you're interested in

## API Endpoints (Backend)

### Authentication
- `POST /register` - Create a new user account
- `POST /login` - Log in and receive JWT token

### Products
- `GET /products` - Retrieve all products
- `GET /products/:id` - Get product details by ID

### Favorites
- `GET /favorites` - Get user's favorite items (requires auth)
- `POST /favorites` - Add item to favorites (requires auth)
- `DELETE /favorites/:id` - Remove item from favorites (requires auth)

### Reviews
- `GET /reviews/:productId` - Get reviews for a product
- `POST /reviews` - Submit a new review (requires auth)

### Recommendations
- `POST /recommendations` - Get recommendations based on quiz answers

## Author
Built as a capstone project with attention to clean code, proper architecture, and user experience.

## License
ISC

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
