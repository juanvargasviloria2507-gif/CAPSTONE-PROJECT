# Backend - User Registration

Author: Jose Vargas

## Description

Backend for the user registration module (BACKEND ticket) for the Capstone project. Implements the `POST /register` endpoint, which validates the received data, checks that the email is not already registered, encrypts the password, and saves the user in the database.

## Technologies

- Node.js
- Express
- MySQL (mysql2)
- bcrypt
- dotenv

## Prerequisites

- Node.js installed (v18 or higher recommended)
- MySQL Server installed and running
- A MySQL manager like MySQL Workbench (optional, but recommended)

## Installation

1. Clone the repository and go to the backend folder:
```
cd BACKEND
```

2. Install dependencies:
```
npm install
```

3. Create the database and table. In MySQL Workbench (or MySQL shell), run:
```sql
CREATE DATABASE CAPSTONE_PROJECT;
USE CAPSTONE_PROJECT;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(70),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(60)
);
```

4. Create the `.env` file in the `BACKEND` folder using `.env.example` as a reference, and fill in your local MySQL connection details:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=CAPSTONE_PROJECT
PORT=3000
```

This file is not committed to GitHub (it is included in `.gitignore`), so each person cloning the repository must create their own with their own connection information.

## Run the server

```
node index.js
```

If everything is configured correctly, the terminal should show:
```
server running on port 3000
MySQL connection successful
```

## Endpoint

### POST /register

Register a new user.

**Body (JSON):**
```json
{
    "name": "Maria",
    "email": "maria@example.com",
    "password": "123456"
}
```

**Successful response (201):**
```json
{
    "message": "User registered successfully",
    "userId": 1
}
```

**Error responses (400):**
```json
{ "error": "missing required fields" }
```
```json
{ "error": "email already exists" }
```

## Presentation notes

Before the demo, verify on the presenting machine:
- MySQL is running
- The `.env` file exists with correct values (it is not committed to GitHub, so it must be created manually)
- `npm install` has been run
- The `users` database and table already exist
