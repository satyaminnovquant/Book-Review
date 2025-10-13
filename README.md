# 📚 Book Review API

A clean, modern API for managing books and reviews with validation and standardized responses.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Database Setup
1. Create MySQL database: `book_review`
2. Copy `.env.example` to `.env` and update:
```env
DB_HOST=localhost
DB_USER=your_user
DB_PASS=your_password
DB_NAME=book_review
JWT_SECRET=your_secret_key
```

### Run Server
```bash
npm run dev
```
Server runs on `http://localhost:3000`

### Stop Server
```bash
# Press Ctrl+C in the terminal to stop the server
```

## 🧪 Postman Testing Guide

### Step 1: Create Account
**Method:** `POST`  
**URL:** `http://localhost:3000/api/auth/signup`  
**Body (JSON):**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "123456"
}
```
**Expected Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": { "userId": 1 }
}
```

### Step 2: Login
**Method:** `POST`  
**URL:** `http://localhost:3000/api/auth/login`  
**Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```
**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```
**⚠️ Copy the `token` for next steps!**

### Step 3: Get All Books
**Method:** `GET`  
**URL:** `http://localhost:3000/api/books`  
**Headers:** None required  
**Expected Response:**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": []
}
```

### Step 4: Add Book (Protected)
**Method:** `POST`  
**URL:** `http://localhost:3000/api/books`  
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```
**Body (JSON):**
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "description": "A classic American novel"
}
```
**Expected Response:**
```json
{
  "success": true,
  "message": "Book added successfully",
  "data": { "bookId": 1 }
}
```

### Step 5: Get Book by ID
**Method:** `GET`  
**URL:** `http://localhost:3000/api/books/1`  
**Headers:** None required  
**Expected Response:**
```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "9780743273565",
    "description": "A classic American novel",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### Step 6: Add Review (Protected)
**Method:** `POST`  
**URL:** `http://localhost:3000/api/reviews`  
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```
**Body (JSON):**
```json
{
  "book_id": 1,
  "rating": 5,
  "comment": "Amazing book! Highly recommended."
}
```
**Expected Response:**
```json
{
  "success": true,
  "message": "Review added successfully",
  "data": { "reviewId": 1 }
}
```

### Step 7: Get Book Reviews
**Method:** `GET`  
**URL:** `http://localhost:3000/api/reviews/book/1`  
**Headers:** None required  
**Expected Response:**
```json
{
  "success": true,
  "message": "Reviews retrieved successfully",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "book_id": 1,
      "rating": 5,
      "comment": "Amazing book! Highly recommended.",
      "created_at": "2024-01-01T00:00:00.000Z",
      "username": "testuser"
    }
  ]
}
```

### Step 8: Get User Reviews (Protected)
**Method:** `GET`  
**URL:** `http://localhost:3000/api/reviews/user`  
**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```
**Expected Response:**
```json
{
  "success": true,
  "message": "User reviews retrieved successfully",
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "book_id": 1,
      "rating": 5,
      "comment": "Amazing book! Highly recommended.",
      "created_at": "2024-01-01T00:00:00.000Z",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    }
  ]
}
```

## 🔧 Postman Collection Setup

### Import Collection
1. Open Postman
2. Click "Import" → "Raw Text"
3. Paste this collection:

```json
{
  "info": { "name": "Book Review API", "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json" },
  "variable": [
    { "key": "baseUrl", "value": "http://localhost:3000/api" },
    { "key": "token", "value": "" }
  ],
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Signup",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/signup",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": { "mode": "raw", "raw": "{\n  \"username\": \"testuser\",\n  \"email\": \"test@example.com\",\n  \"password\": \"123456\"\n}", "options": { "raw": { "language": "json" } } }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/login",
            "header": [{ "key": "Content-Type", "value": "application/json" }],
            "body": { "mode": "raw", "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"123456\"\n}", "options": { "raw": { "language": "json" } } }
          }
        }
      ]
    },
    {
      "name": "Books",
      "item": [
        {
          "name": "Get All Books",
          "request": { "method": "GET", "url": "{{baseUrl}}/books" }
        },
        {
          "name": "Add Book",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/books",
            "header": [
              { "key": "Authorization", "value": "Bearer {{token}}" },
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"title\": \"The Great Gatsby\",\n  \"author\": \"F. Scott Fitzgerald\",\n  \"isbn\": \"9780743273565\",\n  \"description\": \"A classic American novel\"\n}", "options": { "raw": { "language": "json" } } }
          }
        },
        {
          "name": "Get Book by ID",
          "request": { "method": "GET", "url": "{{baseUrl}}/books/1" }
        }
      ]
    },
    {
      "name": "Reviews",
      "item": [
        {
          "name": "Add Review",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/reviews",
            "header": [
              { "key": "Authorization", "value": "Bearer {{token}}" },
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": { "mode": "raw", "raw": "{\n  \"book_id\": 1,\n  \"rating\": 5,\n  \"comment\": \"Amazing book!\"\n}", "options": { "raw": { "language": "json" } } }
          }
        },
        {
          "name": "Get Book Reviews",
          "request": { "method": "GET", "url": "{{baseUrl}}/reviews/book/1" }
        },
        {
          "name": "Get User Reviews",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/reviews/user",
            "header": [{ "key": "Authorization", "value": "Bearer {{token}}" }]
          }
        }
      ]
    }
  ]
}
```

### Set Token Variable
1. After login, copy the token from response
2. Go to Collection Variables
3. Set `token` value to your JWT token

## 🛠️ Features

- ✅ **Input Validation** - Joi schemas for all endpoints
- ✅ **Standardized Responses** - Consistent API response format
- ✅ **SQL Query Helpers** - Reusable database operations
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Error Handling** - Proper error responses

## 🔒 Validation Rules

- **Username**: 3-30 alphanumeric characters
- **Email**: Valid email format
- **Password**: Minimum 6 characters
- **Rating**: 1-5 stars only
- **ISBN**: Required for books
- **One review per user per book**

## ⚠️ Common Errors

| Status | Error | Solution |
|--------|-------|----------|
| 400 | Invalid input | Check request body format |
| 401 | Unauthorized | Add Authorization header with Bearer token |
| 404 | Not found | Check URL and resource ID |
| 422 | Validation failed | Check required fields and formats |
| 500 | Server error | Check database connection and logs |

## 🔧 Troubleshooting 500 Errors

### 1. Check Database Connection
```bash
# Ensure MySQL is running and database exists
mysql -u root -p
CREATE DATABASE book_review;
```

### 2. Verify Environment Variables
```bash
# Check .env file has all required variables
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=book_review
JWT_SECRET=your_secret_key
```

### 3. Check Server Logs
```bash
# Run server and check console for detailed errors
npm run dev
```

### 4. Test API Endpoints
```bash
# Run the test script
node test-api.js
```

### 5. Common Issues
- **Missing Content-Type header**: Add `Content-Type: application/json`
- **Invalid JSON**: Check request body syntax
- **Database not created**: Create `book_review` database
- **Wrong credentials**: Update `.env` with correct DB credentials

## 📝 Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```