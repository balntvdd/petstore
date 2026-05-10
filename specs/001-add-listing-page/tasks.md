---

description: "Task list template for feature implementation"
---

# Tasks: Listing Page

**Input**: Design documents from `/specs/001-add-listing-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are optional; none included as not requested in spec.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths

## Path Conventions

- **Web app**: `backend/src/main/java/com/natividad/petstore/`, `frontend/src/`
- Paths shown below assume web app structure - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create backend project structure per implementation plan
- [X] T002 Create frontend project structure per implementation plan
- [X] T003 [P] Initialize Spring Boot backend with dependencies in backend/pom.xml
- [X] T004 [P] Initialize React frontend with dependencies in frontend/package.json
- [X] T005 [P] Configure Docker setup in docker/docker-compose.yml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Setup Postgres database schema for Pet entity in backend/src/main/resources/db/migration/
- [X] T007 Create Pet JPA entity in backend/src/main/java/com/natividad/petstore/model/Pet.java
- [X] T008 Create PetRepository in backend/src/main/java/com/natividad/petstore/repository/PetRepository.java
- [X] T009 Create PetService in backend/src/main/java/com/natividad/petstore/service/PetService.java
- [X] T010 Configure CORS and basic security in backend

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Pet Listings (Priority: P1) 🎯 MVP

**Goal**: Display a list of available pets with details

**Independent Test**: Navigate to listing page and verify pets are shown

- [X] T011 [US1] Implement GET /natividad/pets controller in backend/src/main/java/com/natividad/petstore/controller/PetController.java
- [X] T012 [US1] Create PetDTO for API responses in backend/src/main/java/com/natividad/petstore/dto/PetDTO.java
- [X] T013 [US1] Add pagination support to PetService
- [X] T014 [US1] Create React ListingPage component in frontend/src/pages/ListingPage.jsx
- [X] T015 [US1] Create PetCard component in frontend/src/components/PetCard.jsx
- [X] T016 [US1] Implement API service for fetching pets in frontend/src/services/petService.js
- [X] T017 [US1] Add routing for listing page in frontend/src/App.js
- [X] T018 [US1] Style listing page with Tailwind and MUI in frontend/src/pages/ListingPage.jsx

**Checkpoint**: User Story 1 fully functional and independently testable

---

## Phase 4: User Story 2 - Filter Pets by Type (Priority: P2)

**Goal**: Allow filtering pets by type

**Independent Test**: Apply type filter and verify results

- [X] T019 [US2] Add type filter parameter to GET /natividad/pets controller
- [X] T020 [US2] Implement type filtering in PetService
- [X] T021 [US2] Create FilterControls component in frontend/src/components/FilterControls.jsx
- [X] T022 [US2] Integrate filter controls into ListingPage
- [X] T023 [US2] Update petService to handle filter parameters

**Checkpoint**: User Story 2 fully functional and independently testable

---

## Phase 5: User Story 3 - Search Pets (Priority: P3)

**Goal**: Enable search by name or description

**Independent Test**: Enter search term and verify matching pets

- [X] T024 [US3] Add search parameter to GET /natividad/pets controller
- [X] T025 [US3] Implement search logic in PetService using JPA Criteria
- [X] T026 [US3] Create SearchBar component in frontend/src/components/SearchBar.jsx
- [X] T027 [US3] Integrate search bar into ListingPage
- [X] T028 [US3] Update petService to handle search parameters

**Checkpoint**: User Story 3 fully functional and independently testable

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Final touches, error handling, and deployment prep

- [X] T029 Add error handling for API failures in frontend
- [X] T030 Implement empty state and no results messages in frontend
- [X] T031 Add loading states and spinners in frontend
- [X] T032 Configure production build for frontend
- [X] T033 Add basic logging to backend
- [X] T034 Prepare Docker images for deployment
- [X] T035 Update README with deployment instructions

---

## Dependencies

- T001-T005: No dependencies
- T006-T010: After T001-T005
- T011-T018: After T006-T010
- T019-T023: After T011-T018
- T024-T028: After T019-T023
- T029-T035: After T024-T028

## Parallel Opportunities

- T003, T004, T005: Can run in parallel
- T011-T013: Backend tasks can parallel with T014-T018 frontend
- T019-T020: Backend with T021-T023 frontend
- T024-T025: Backend with T026-T028 frontend

## Implementation Strategy

MVP: Complete Phase 1-3 (User Story 1) for basic listing functionality. Incremental delivery: Add filtering (US2), then search (US3). Fullstack approach with backend-first for API, then frontend integration.