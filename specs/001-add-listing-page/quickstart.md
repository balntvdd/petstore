# Quickstart: Listing Page

## Prerequisites
- Java 17
- Node.js 18
- Docker
- Postgres (via Docker)

## Setup
1. Clone the repository and checkout branch `001-add-listing-page`
2. Start Postgres: `docker-compose up -d postgres`
3. Backend: `cd backend; ./mvnw spring-boot:run`
4. Frontend: `cd frontend; npm install; npm start`
5. Open http://localhost:3000/listing

## API Endpoints
- GET /natividad/pets - List pets with filters

## Testing
- Backend: `./mvnw test`
- Frontend: `npm test`

## Deployment
- Build Docker images
- Deploy to Render with free-tier Postgres