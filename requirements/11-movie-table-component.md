# Movie Table Component

## Overview
Table displaying all movies with edit/delete actions and add functionality via modals.

## Location
`frontend/src/app/components/movie-table/`

## Files
- `movie-table.ts` - Component logic
- `movie-table.html` - Template
- `movie-table.scss` - Styles

## Component Structure

### Properties (Signals)
```typescript
movies = signal<Movie[]>([]);
categories = signal<Category[]>([]);  // For category name lookup
isModalOpen = signal(false);
isDeleteModalOpen = signal(false);
selectedMovie = signal<Movie | null>(null);
modalTitle = signal('');
```

### Dependencies
- MovieService - CRUD operations
- CategoryService - Load categories for name lookup
- Modal - Reusable modal component
- MovieForm - Form for add/edit
- DatePipe - Format dates

## Methods

### loadMovies()
Fetches all movies from API and updates signal.

### loadCategories()
Fetches all categories for ID-to-name lookup.

### getCategoryName(id: number)
Returns category name for given ID using categories signal.

### openAddModal()
Sets selectedMovie to null, title to "Add Movie", opens modal.

### openEditModal(movie: Movie)
Sets selectedMovie to movie, title to "Edit Movie", opens modal.

### openDeleteModal(movie: Movie)
Sets selectedMovie and opens delete confirmation modal.

### closeModal() / closeDeleteModal()
Closes respective modals and clears selectedMovie.

### confirmDelete()
Calls MovieService.delete(), reloads movies, closes modal.

### onMovieSaved()
Called when form emits `saved` event. Reloads movies and closes modal.

## Table Columns
| Column | Field | Notes |
|--------|-------|-------|
| ID | id | |
| Title | title | |
| Year | year | |
| Director | director | |
| Plot | plot | Truncated with CSS |
| Poster | poster | Thumbnail image |
| Rating | rating | |
| Watched | isWatched | Yes/No |
| Categories | categoryIds | Lookup names via getCategoryName() |
| Created At | createdAt | Formatted with DatePipe |
| Actions | - | Edit/Delete buttons |

## Category Display Pattern
Backend returns `categoryIds: [1, 2]` (just IDs).
Frontend loads all categories separately and does lookup:
```typescript
getCategoryName(id: number): string {
  return this.categories().find(c => c.id === id)?.name || '';
}
```

## Modal Usage
- Add/Edit modal contains MovieForm component
- Delete modal shows confirmation with Cancel/Delete buttons
