# Category Form Component

## Overview
Reusable form for creating and editing categories.

## Location
`frontend/src/app/components/category-form/`

## Files
- `category-form.ts` - Component logic
- `category-form.html` - Template
- `category-form.scss` - Styles

## Component Structure

### Inputs/Outputs
```typescript
@Input() category: Category | null = null;  // Pass category for edit mode
@Output() saved = new EventEmitter<void>();  // Emits when saved
```

### Properties
```typescript
categoryForm = this.fb.nonNullable.group({
  name: ['', [Validators.required, Validators.maxLength(100)]]
});
```

### Dependencies
- FormBuilder (for reactive forms)
- CategoryService (to save categories)

### Form Fields
| Field | Type | Validation |
|-------|------|------------|
| name | text | Required, maxLength(100) |

## Methods

### ngOnChanges()
Detects when `category` input changes:
- If category exists: populate form for edit mode
- If category is null: reset form for add mode

### onSubmit()
1. Validates form
2. Calls CategoryService.create() or update() based on mode
3. Emits `saved` event for parent to refresh

## Data Sent to API
```typescript
{
  name: "Action"
}
```
