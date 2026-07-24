# page-pulse

Production-oriented URL audit service built with Express.

## Features

- Input validation for audit requests
- Request timeouts and concurrency limits
- In-memory caching for repeated audits
- Per-client rate limiting
- Structured logging with request IDs
- Health check endpoint

## API contract

### Health check

GET /healthz

Response:

```json
{
  "status": "ok",
  "requestId": "<request-id>"
}
```

### Audit a URL

POST /api/audit

Request body:

```json
{
  "url": "https://example.com"
}
```

Success response:

```json
{
  "success": true,
  "data": {
    "url": "https://example.com",
    "statusCode": 200,
    "finalUrl": "https://example.com",
    "cached": false,
    "timestamp": "2026-07-24T00:00:00.000Z"
  },
  "requestId": "<request-id>"
}
```

Error response:

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "The URL must be a valid absolute URL"
  },
  "requestId": "<request-id>"
}
```

## Run locally

```bash
npm install
npm start
```

The server listens on port 3000 by default.
