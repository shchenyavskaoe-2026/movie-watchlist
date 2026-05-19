# Movie Form Component

## Overview
Reusable form for creating and editing movies with category selection.

## Location
`frontend/src/app/components/movie-form/`

## Files
- `movie-form.ts` - Component logic
- `movie-form.html` - Template
- `movie-form.scss` - Styles
- `movie-form.spec.ts` - Tests

## Component Structure

### Inputs/Outputs
```typescript
@Input() movie: Movie | null = null;  // Pass movie for edit mode
@Output() saved = new EventEmitter<void>();  // Emits when saved
```

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
| poster | text | maxLength(500), URL pattern |
| rating | number | min(1), max(10) |
| isWatched | checkbox | - |
| categories | checkboxes | (separate signal) |

## Methods

### ngOnChanges()
Detects when `movie` input changes:
- If movie exists: populate form for edit mode
- If movie is null: reset form for add mode

### loadCategories()
Fetches all categories on component init for the checkbox list.

### toggleCategory(categoryId)
Adds/removes category ID from selectedCategoryIds signal.

### onSubmit()
1. Validates form
2. Combines form values with selected categoryIds
3. Calls MovieService.create() or update() based on mode
4. Emits `saved` event for parent to refresh
5. Resets form on success (add mode only)

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
  poster: "https://example.com/poster.jpg",
  rating: 9,
  isWatched: true,
  categoryIds: [1, 3]  // Just IDs, not full objects
}
```

## Edit Mode Flow
1. Parent passes `movie` via @Input
2. ngOnChanges detects change
3. Form is populated with movie data
4. Categories are pre-selected
5. On submit, calls update() instead of create()
6. Emits `saved` event
