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

| Method | Endpoint     | Description                |
| :-------- | :------- | :------------------------- |
| `POST` | /api/auth/register | Register a user |
| `POST` | /api/auth/login | Login & get token


### Categories
All routes below require Authorization: Bearer 
<token>
1. Create Category
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

2. Get All Categories (Tree View)
Endpoint: GET /api/categories

3. Update Category
Endpoint: PUT /api/categories/:categoryId
Payload:
```
{
"name": "Updated Category Name"
}
```

4. Reassign Subcategory to Another Parent
Endpoint: PUT /api/categories/:categoryId/reassign/:subcategoryId
Description: Reassign subcategoryId under new categoryId

5. Delete Category
Endpoint: DELETE /api/categories/:categoryId
Description: Deletes a category and reassigns its subcategories to its parent.


## Unit + Integration Tests

To run tests, run the following command

```bash
  npm run test
```
- Jest for unit testing
- MongoMemoryServer to mock MongoDB 
 - Supertest for HTTP API tests


