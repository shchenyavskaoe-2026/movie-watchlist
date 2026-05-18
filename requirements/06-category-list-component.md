# Category List Component

## Overview
Displays all categories fetched from the API.

## Location
`frontend/src/app/components/category-list/`

## Files
- `category-list.ts` - Component logic
- `category-list.html` - Template
- `category-list.scss` - Styles
- `category-list.spec.ts` - Tests

## Component Structure

### Properties
```typescript
categories = signal<Category[]>([]);
```

### Dependencies
- CategoryService (injected)

### Lifecycle
- `ngOnInit`: Calls `loadCategories()`

### Methods
```typescript
loadCategories(): void {
  this.categoryService.getAll().subscribe(data => {
    this.categories.set(data);
  });
}
```

## Template
```html
<div class="category-list">
  <h2>Categories</h2>
  <ul>
    @for (category of categories(); track $index) {
      <li>{{ category.name }}</li>
    } @empty {
      <li>No categories found</li>
    }
  </ul>
</div>
```

## Data Flow
```
Component Init → CategoryService.getAll() → API → Signal Update → Template Render
```

## Current Limitations
- No add category form
- No delete button
- No edit functionality
- No movie count display
