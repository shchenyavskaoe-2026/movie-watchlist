# Category CRUD API

## Overview
RESTful API endpoints for managing movie categories.

## Endpoints

### GET /api/categories
- **Description:** Get all categories with their movies
- **Response:** `200 OK` with `Category[]`
- **Includes:** Movies (eager loaded)

### GET /api/categories/{id}
- **Description:** Get single category by ID
- **Response:** `200 OK` with `Category` or `404 Not Found`
- **Includes:** Movies (eager loaded)

### POST /api/categories
- **Description:** Create new category
- **Request Body:** `{ "name": "Action" }`
- **Response:** `201 Created` with created Category

### PUT /api/categories/{id}
- **Description:** Update category name
- **Request Body:** `{ "name": "New Name" }`
- **Response:** `200 OK` with updated Category or `404 Not Found`

### DELETE /api/categories/{id}
- **Description:** Delete category
- **Response:** `204 No Content` or `404 Not Found`
- **Note:** Junction table entries auto-deleted (cascade)

### GET /api/categories/{id}/movies/count
- **Description:** Get count of movies in category
- **Response:** `200 OK` with integer count

## Additional Repository Methods
```csharp
Task<Category?> GetByNameAsync(string name);
Task<bool> ExistsAsync(int id);
Task<int> GetMoviesCountAsync(int categoryId);
```

## Validation
- Name: Required, Max 50 characters
