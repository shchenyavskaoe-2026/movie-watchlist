# Category Table Component

## Overview
Table displaying all categories with edit/delete actions and add functionality via modals.

## Location
`frontend/src/app/components/category-table/`

## Files
- `category-table.ts` - Component logic
- `category-table.html` - Template
- `category-table.scss` - Styles

## Component Structure

### Properties (Signals)
```typescript
categorys = signal<Category[]>([]);
isModalOpen = signal(false);
isDeleteModalOpen = signal(false);
selectedCategory = signal<Category | null>(null);
modalTitle = signal('');
```

### Dependencies
- CategoryService - CRUD operations
- Modal - Reusable modal component
- CategoryForm - Form for add/edit

## Methods

### loadCategory()
Fetches all categories from API and updates signal.

### openAddModal()
Sets selectedCategory to null, title to "Add Category", opens modal.

### openEditModal(category: Category)
Sets selectedCategory to category, title to "Edit Category", opens modal.

### openDeleteModal(category: Category)
Sets selectedCategory and opens delete confirmation modal.

### closeModal() / closeDeleteModal()
Closes respective modals and clears selectedCategory.

### confirmDelete()
Calls CategoryService.delete(), reloads categories, closes modal.

### onCategorySaved()
Called when form emits `saved` event. Reloads categories and closes modal.

## Table Columns
| Column | Field |
|--------|-------|
| ID | id |
| Name | name |
| Movies | movie (list of associated movies) |
| Actions | Edit/Delete buttons |

## Modal Usage
- Add/Edit modal contains CategoryForm component
- Delete modal shows confirmation with Cancel/Delete buttons
