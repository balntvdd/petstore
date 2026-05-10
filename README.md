# PetStore

Fullstack pet listing application built with Java Spring Boot, PostgreSQL, Docker, React, Tailwind CSS, and MUI.

## Local Setup

### Backend

1. Install Java 17 and Maven.
2. In `backend/`, run:
   ```bash
   mvn spring-boot:run
   ```
3. Backend listens on `http://localhost:8080`.

### Frontend

1. Install Node.js 18+.
2. In `frontend/`, run:
   ```bash
   npm install
   npm run dev
   ```
3. Frontend listens on `http://localhost:5173`.

## Docker Setup

From the repository root:

```bash
cd docker
docker-compose up --build
```

- Backend: `http://localhost:8080`
- Frontend: `http://localhost:3000`
- Postgres: `localhost:5432`

## API

- `GET /natividad/pets` - lists pets, supports `type`, `search`, `minPrice`, `maxPrice`, `minAge`, `maxAge`, `availability`, `page`, and `size` query parameters.
- `GET /natividad/pets/{id}` - retrieves details for a single pet.
- `GET /natividad/cart` - returns the current cart items.
- `POST /natividad/cart/{petId}` - adds a pet to the cart.
- `DELETE /natividad/cart/{petId}` - removes a pet from the cart.
- `GET /natividad/wishlist` - returns the current wishlist items.
- `POST /natividad/wishlist/{petId}` - adds a pet to the wishlist.
- `DELETE /natividad/wishlist/{petId}` - removes a pet from the wishlist.

## Notes

- Frontend uses Vite with Tailwind CSS and MUI components.
- Backend applies Flyway migration and reads Postgres configuration from environment variables.
