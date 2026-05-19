# Home Page

## Overview
Landing page displaying movie and category lists (read-only view).

## Location
`frontend/src/app/pages/home/`

## Files
- `home.ts` - Component logic
- `home.html` - Template
- `home.scss` - Styles

## Component Structure

### Dependencies
- MovieList - Displays list of movies
- CategoryList - Displays list of categories

## Template
```html
<h1>Movie Watchlist</h1>
<app-category-list></app-category-list>
<app-movie-list></app-movie-list>
```

## Purpose
- Read-only view of movies and categories
- Quick overview without management features
- Links to Settings page for editing

## Comparison with Settings Page
| Feature | Home | Settings |
|---------|------|----------|
| View data | Yes | Yes |
| Add/Edit/Delete | No | Yes |
| Tabs | No | Yes |
| Purpose | Overview | Management |
