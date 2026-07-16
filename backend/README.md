# Backend - Registro de Usuarios

Autor: Jose Vargas

## Descripcion

Backend del modulo de registro de usuarios (ticket BACKEND) para el proyecto Capstone. Implementa el endpoint `POST /register`, que valida los datos recibidos, verifica que el correo no este registrado, encripta la contrasena y guarda el usuario en la base de datos.

## Tecnologias

- Node.js
- Express
- MySQL (mysql2)
- bcrypt
- dotenv

## Requisitos previos

- Node.js instalado (v18 o superior recomendado)
- MySQL Server instalado y corriendo
- Un gestor de MySQL como MySQL Workbench (opcional, pero recomendado)

## Instalacion

1. Clonar el repositorio y entrar a la carpeta del backend:
```
cd BACKEND
```

2. Instalar las dependencias:
```
npm install
```

3. Crear la base de datos y la tabla. En MySQL Workbench (o consola de MySQL), ejecutar:
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

4. Crear el archivo `.env` en la carpeta `BACKEND`, usando `.env.example` como referencia, y completar con los datos reales de tu MySQL local:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contrasena
DB_NAME=CAPSTONE_PROJECT
PORT=3000
```

Este archivo no se sube a GitHub (esta incluido en `.gitignore`), asi que cada persona que clone el repositorio debe crear el suyo con sus propios datos de conexion.

## Correr el servidor

```
node index.js
```

Si todo esta bien configurado, en la terminal debe aparecer:
```
server running on port 3000
Conexion a MySQL exitosa
```

## Endpoint

### POST /register

Registra un nuevo usuario.

**Body (JSON):**
```json
{
    "name": "Maria",
    "email": "maria@example.com",
    "password": "123456"
}
```

**Respuesta exitosa (201):**
```json
{
    "message": "User registered successfully",
    "userId": 1
}
```

**Respuestas de error (400):**
```json
{ "error": "missing required fields" }
```
```json
{ "error": "email already exists" }
```

## Notas para la presentacion

Antes de la demo, verificar en la maquina donde se va a presentar:
- Que MySQL este corriendo
- Que exista el archivo `.env` con los datos correctos (no se sube a GitHub, hay que crearlo manualmente)
- Que se haya corrido `npm install`
- Que la base de datos y la tabla `users` ya existan
