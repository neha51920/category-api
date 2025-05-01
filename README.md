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


## Unit + Integration Tests

To run tests, run the following command

```bash
  npm run test
```
- Jest for unit testing
- MongoMemoryServer to mock MongoDB 
 - Supertest for HTTP API tests

### Run tests
```
npm test
```


## structure
```
src/
├── controllers/
│ ├── authController.ts
│ └── categoryController.ts
├── middleware/
│ └── auth.ts
├── models/
│ ├── Category.ts
│ └── User.ts
├── routes/
│ ├── authRoutes.ts
│ └── categoryRoutes.ts
├── tests/
│ ├── auth.test.ts
│ └── category.test.ts
├── utils/
│ └── connectDB.ts
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
5. Run tests
```
npm test
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
| Method | Endpoint     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `POST`      | `/api/category` | Create new category
| `GET`      | `/api/category` | Get all categories in tree format
| `PUT`      | `/api/category/:id` | Get all categories in tree format
| `DELETE`      | `/api/category/:id` | Delete & reassign subcategories



## Unit + Integration Tests

To run tests, run the following command

```bash
  npm run test
```
- Jest for unit testing
- MongoMemoryServer to mock MongoDB 
 - Supertest for HTTP API tests


