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

