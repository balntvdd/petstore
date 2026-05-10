# API Contract: Get Pets

## Endpoint
`GET /natividad/pets`

## Description
Retrieves a paginated list of available pets, with optional filtering and searching.

## Request
### Query Parameters
- `type` (optional): Filter by pet type (dog, cat, bird, fish)
- `search` (optional): Search term for name or description
- `page` (optional): Page number (default 0)
- `size` (optional): Page size (default 20, max 100)

### Headers
- `Accept`: application/json

## Response
### Success (200 OK)
```json
{
  "pets": [
    {
      "id": "uuid",
      "name": "string",
      "type": "dog|cat|bird|fish",
      "price": 99.99,
      "description": "string",
      "image_url": "string",
      "available": true
    }
  ],
  "pagination": {
    "page": 0,
    "size": 20,
    "totalElements": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

### Error Responses
- 400 Bad Request: Invalid query parameters
- 500 Internal Server Error: Database error

## Notes
- Only available pets are returned.
- Search is case-insensitive partial match.
- Pagination starts at 0.