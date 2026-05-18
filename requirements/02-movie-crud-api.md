# Movie CRUD API

## Overview
RESTful API endpoints for managing movies.

## Endpoints

### GET /api/movies
- **Description:** Get all movies with their categories
- **Response:** `200 OK` with `Movie[]`
- **Includes:** Categories (eager loaded)

### GET /api/movies/{id}
- **Description:** Get single movie by ID
- **Response:** `200 OK` with `Movie` or `404 Not Found`
- **Includes:** Categories (eager loaded)

### POST /api/movies
- **Description:** Create new movie
- **Request Body:** Movie object (id, createdAt auto-generated)
- **Response:** `201 Created` with created Movie
- **Special Handling:**
  - Sets `CreatedAt = DateTime.UtcNow`
  - Links existing categories by ID (many-to-many)

### PUT /api/movies/{id}
- **Description:** Update existing movie
- **Request Body:** Movie object with updated fields
- **Response:** `200 OK` with updated Movie or `404 Not Found`

### DELETE /api/movies/{id}
- **Description:** Delete movie
- **Response:** `204 No Content` or `404 Not Found`

### GET /api/movies?watched={bool}
- **Description:** Filter movies by watched status
- **Response:** `200 OK` with filtered `Movie[]`

## Repository Methods
```csharp
Task<List<Movie>> GetAllAsync();
Task<Movie?> GetByIdAsync(int id);
Task<Movie> CreateAsync(Movie movie);
Task<Movie?> UpdateAsync(int id, Movie movie);
Task<bool> DeleteAsync(int id);
Task<List<Movie>> GetByWatchedStatusAsync(bool isWatched);
```

## Many-to-Many Handling
When creating a movie with categories:
1. Extract category IDs from request
2. Load existing categories from database
3. Assign to movie's Categories collection
4. Save movie (EF Core handles junction table)

```csharp
var categoryIds = movie.Categories.Select(c => c.Id).ToList();
movie.Categories = await _context.Categories
    .Where(c => categoryIds.Contains(c.Id))
    .ToListAsync();
```
