# Movie Form Component

## Overview
Form for creating new movies with category selection.

## Location
`frontend/src/app/components/movie-form/`

## Files
- `movie-form.ts` - Component logic
- `movie-form.html` - Template
- `movie-form.scss` - Styles
- `movie-form.spec.ts` - Tests

## Component Structure

### Properties
```typescript
categories = signal<Category[]>([]);
selectedCategoryIds = signal<number[]>([]);
movieForm = this.fb.nonNullable.group({...});
```

### Dependencies
- FormBuilder (for reactive forms)
- MovieService (to save movies)
- CategoryService (to load categories)

### Form Fields
| Field | Type | Validation |
|-------|------|------------|
| title | text | Required, maxLength(200) |
| year | number | - |
| director | text | - |
| plot | textarea | - |
| rating | number | min(1), max(10) |
| isWatched | checkbox | - |
| categories | checkboxes | (separate signal) |

## Methods

### loadCategories()
Fetches all categories on component init for the checkbox list.

### toggleCategory(categoryId)
Adds/removes category ID from selectedCategoryIds signal.

### onSubmit()
1. Validates form
2. Combines form values with selected categories
3. Calls MovieService.create()
4. Resets form on success

## Template Features
- Reactive form binding with `[formGroup]` and `formControlName`
- Validation error messages with `@if`
- Category checkboxes with `@for`
- Disabled button when invalid

## Data Sent to API
```typescript
{
  title: "Inception",
  year: 2010,
  director: "Christopher Nolan",
  plot: "...",
  rating: 9,
  isWatched: true,
  categories: [{ id: 1 }, { id: 3 }]
}
```

## Current Limitations
- No edit mode (create only)
- Movie list doesn't auto-refresh after save
- No loading indicator during save
- No success/error messages
