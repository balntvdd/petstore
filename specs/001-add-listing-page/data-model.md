# Data Model

## Entities

### Pet
Represents a pet available for sale in the PetStore.

**Attributes:**
- `id`: UUID (primary key)
- `name`: String (required, max 100 chars)
- `type`: Enum (dog, cat, bird, fish) (required)
- `price`: Decimal (required, positive)
- `description`: Text (optional, max 1000 chars)
- `image_url`: String (optional, URL)
- `available`: Boolean (default true)

**Relationships:**
- None (standalone entity for MVP)

**Validation Rules:**
- Name: Not empty, alphanumeric + spaces
- Price: > 0, max 999999.99
- Type: One of allowed values
- Image URL: Valid URL format if provided

**State Transitions:**
- Available -> Unavailable (when sold)
- Unavailable -> Available (restocked)

**Notes:**
- Images stored externally or in static files.
- Future: Add category, breed, age, etc.