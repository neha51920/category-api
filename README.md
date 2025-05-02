# Multi-Level Category Management API

This project is a Node.js + TypeScript RESTful API to manage multi-level categories with JWT authentication. Categories are structured like a tree and support create, read (as a tree), update, and delete operations.

## Features
- User registration & login (JWT)
- Protected routes
- Multi-level nested categories
- Recursive category tree retrieval
- Status-based propagation
- Reassignment  on delete
- MongoDB + Mongoose
- Unit and integration tests with Jest, Supertest, MongoMemoryServer

## Tech Stack
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT
- Jest + Supertest + MongoMemoryServer

## structure
```
src/
├── controllers/
│ ├── authController.ts
│ └── categoryController.ts
├── middleware/
│ └── authenticateToken.ts
│ └── errorMiddleware.ts
├── models/
│ ├── Category.ts
│ └── User.ts
├── routes/
│ ├── authRoutes.ts
│ └── categoryRoutes.ts
├── tests/
│ ├── unit/
│ |   ├── authController.test.ts
│ ├── integration/
│ |    └── category.test.ts
| └── setup.ts
├── utils/
│ └── generateToken.ts
├── app.ts
└── server.ts
```
## Setup Instructions

1. Clone the repository
```
git clone <your-repo-url>
cd <repo-folder>
```
2. Install dependencies
```
npm install
```
3. Create .env file
```
PORT
MONGO_URI
JWT_SECRET
```

4. Start the server
```
npm run dev
```

## API Reference

#### Auth
**1. Register a User** <br/>
Endpoint: POST /api/auth/register
Payload:
```
{
"email": "testuser@example.com",
"password": "password123"
}
```
**2. Login a User** <br/>
Endpoint: POST /api/auth/login
Payload:
```
{
"email": "testuser@example.com",
"password": "password123"
}
```
Returns:
```
{
"token": "your_jwt_token"
}
```
Use this token in all protected routes:
Header:
```
Authorization: Bearer your_jwt_token
```



### Categories
All routes below require Authorization: Bearer 
<token> <br/>
**1. Create Category** <br/>
Endpoint: POST /api/categories

Payload for Root Category:
```
{
"name": "Electronics"
}
```

Payload for Subcategory:
```
{
"name": "Mobile Phones",
"parent": "parent_category_id"
}
```

**2. Get All Categories (Tree View)** <br/>
Endpoint: GET /api/categories

**3. Update Category** <br/>
Endpoint: PUT /api/categories/:categoryId <br/>
Payload:
```
{
"name": "Updated Category Name"
}
```

**4. Reassign Subcategory to Another Parent **<br/>
Endpoint: PUT /api/categories/:categoryId/reassign/:subcategoryId <br/>
Description: Reassign subcategoryId under new categoryId 

**5. Delete Category <br/>**
Endpoint: DELETE /api/categories/:categoryId <br/>
Description: Deletes a category and reassigns its subcategories to its parent.


## Unit + Integration Tests

To run tests, run the following command

```bash
  npm run test
```
- Jest for unit testing
- MongoMemoryServer to mock MongoDB 
 - Supertest for HTTP API tests


