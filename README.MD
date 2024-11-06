# API Gateway - User Authentication Service

## Description

This is a Node.js based API Gateway service that handles user authentication with features like signup and user management. The service is built using Express.js and follows a layered architecture pattern with proper error handling and response formatting.

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL

## Features

- User signup with email and password
- Password validation (minimum 8 characters)
- Email validation and uniqueness check
- Structured error handling
- Standardized API responses
- Database CRUD operations

## API Endpoints

### Sign Up

Create a new user account.

```
POST /api/v1/signup
```

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Successfully created a new user",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "createdAt": "2024-11-05T...",
    "updatedAt": "2024-11-05T..."
  },
  "error": {}
}
```

#### Error Responses

**Invalid Password:**

```json
{
  "success": false,
  "message": "Password must be at least 8 characters long",
  "data": {},
  "error": {
    "statusCode": 400,
    "name": "AppError",
    "message": "Password must be at least 8 characters long"
  }
}
```

**Email Already Exists:**

```json
{
  "success": false,
  "message": "Email already registered",
  "data": {},
  "error": {
    "statusCode": 400,
    "name": "AppError",
    "message": "Email already registered"
  }
}
```

## Setup and Installation

1. Clone the repository

```bash
git clone <repository-url>
cd api-gateway
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables
   Create a `.env` file in the root directory and add:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
SALT_ROUNDS=any_number
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=expiry_time
```

4. Run database migrations

```bash
npx sequelize-cli db:migrate
```

5. Start the server

```bash
npm start
```

## Error Handling

The application implements centralized error handling with:

- Custom AppError class for application-specific errors
- Standardized error responses
- HTTP status code mapping
- Validation error handling
- Database error handling

## Response Formats

### Success Response Structure

```json
{
  "success": true,
  "message": "Success message",
  "data": {},
  "error": {}
}
```

### Error Response Structure

```json
{
  "success": false,
  "message": "Error message",
  "data": {},
  "error": {
    "statusCode": 400,
    "name": "ErrorName",
    "message": "Detailed error message"
  }
}
```

## Constants and Messages

All static messages and constants are maintained in `utils/constants.js` for easy maintenance and consistency.

## Author

Rizon Rahi

## Version

1.0.0
