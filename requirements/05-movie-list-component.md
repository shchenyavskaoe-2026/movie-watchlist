# Movie List Component

## Overview
Displays all movies fetched from the API.

## Location
`frontend/src/app/components/movie-list/`

## Files
- `movie-list.ts` - Component logic
- `movie-list.html` - Template
- `movie-list.scss` - Styles
- `movie-list.spec.ts` - Tests

## Component Structure

### Properties
```typescript
movies = signal<Movie[]>([]);
```

### Dependencies
- MovieService (injected)

### Lifecycle
- `ngOnInit`: Calls `loadMovies()`

### Methods
```typescript
loadMovies(): void {
  this.movieService.getAll().subscribe(data => {
    this.movies.set(data);
  });
}
```

## Template
```html
<div class="movie-list">
  <h2>Movies</h2>
  <ul>
    @for (movie of movies(); track movie.id) {
      <li>
        <strong>{{ movie.title }}</strong> ({{ movie.year }})
        @if (movie.isWatched) {
          <span> ✓ Watched</span>
        }
      </li>
    } @empty {
      <li>No movies found</li>
    }
  </ul>
</div>
```

## Data Flow
```
Component Init → MovieService.getAll() → API → Signal Update → Template Render
```

## Current Limitations
- No auto-refresh after adding movie (manual page refresh needed)
- No delete button
- No edit functionality
- No category display
