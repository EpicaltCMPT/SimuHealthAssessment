# Todo API

RESTful API for managing todos with JWT authentication. Built with Express.js and TypeScript.

## Prerequisites

- Node.js (v14+)
- npm

## Installation

```bash
npm install
```

## Running

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm run start
```

Server runs on port 3000. Optional: Set `JWT_SECRET` environment variable (defaults to "dev_key").

## API Endpoints

### Health Check

**GET** `/test`

Returns `{"status": "ok"}`

### Authentication

**POST** `/auth/register`

Creates a new user account.

Request:
```json
{
  "username": "string",
  "password": "string (min 6 chars)"
}
```

Response: `201 Created`
```json
{
  "id": "uuid",
  "username": "string"
}
```

**POST** `/auth/login`

Returns JWT token.

Request: Same as register

Response: `200 OK`
```json
{
  "result": {
    "token": "jwt_token"
  }
}
```

### Todos

**GET** `/todo`

Get all todos (public). Parameters: `completed`, `category`, `description`

Response: `200 OK` - Array of todo objects

**POST** `/todo`

Creates todo (requires authentication).
Headers: `Authorization: Bearer <token>`

Request:
```json
{
  "description": "string (required)",
  "category": "string (optional)"
}
```

Response: `201 Created` - Todo object

**PATCH** `/todo/:id`

Update todo (requires auth and ownership).

Headers: `Authorization: Bearer <token>`

Request:
```json
{
  "description": "string (optional)",
  "category": "string (optional)",
  "completed": "boolean (optional)"
}
```

Response: `200 OK` - Updated todo object

**DELETE** `/todo/:id`

Delete todo (requires auth and ownership).

Headers: `Authorization: Bearer <token>`

Response: `200 OK` - `true`

## Authentication

Protected routes require JWT token in header:
```
Authorization: Bearer <token>
```
Tokens expire after 1 hour.

## Error Responses

- `400` - Validation error: `{"message": "invalid error", "errors": "..."}`
- `401` - Unauthorized: `{"message": "Unauthorized: ..."}`
- `404` - Not found: `{"message": "Todo not found"}`
- `500` - Server error: `{"message": "error message"}`

## Project Structure

```
src/
├── controllers/  # Request handlers
├── middleware/   # Validation, auth, error handling
├── models/       # TypeScript interfaces
├── repo/         # In-memory storage
├── routes/       # Route definitions
├── schemas/      # Zod validation schemas
├── services/     # Logic
└── index.ts      # Entry point
```
