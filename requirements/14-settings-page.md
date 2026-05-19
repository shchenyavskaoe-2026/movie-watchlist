# Settings Page

## Overview
Management page with tabs for Movies and Categories tables.

## Location
`frontend/src/app/pages/settings/`

## Files
- `settings.ts` - Component logic
- `settings.html` - Template
- `settings.scss` - Styles

## Component Structure

### Properties
```typescript
activeTab = signal<'movies' | 'categories'>('movies');
```

### Dependencies
- MovieTable - Table component for movies
- CategoryTable - Table component for categories

## Methods

### setTab(tab: 'movies' | 'categories')
Changes the active tab.

## Template
```html
<div class="settings-page">
  <h1>Settings</h1>

  <div class="tabs">
    <button
      [class.active]="activeTab() === 'movies'"
      (click)="setTab('movies')">
      Movies
    </button>
    <button
      [class.active]="activeTab() === 'categories'"
      (click)="setTab('categories')">
      Categories
    </button>
  </div>

  <div class="tab-content">
    @if (activeTab() === 'movies') {
      <app-movie-table></app-movie-table>
    }

    @if (activeTab() === 'categories') {
      <app-category-table></app-category-table>
    }
  </div>
</div>
```

## Tab Styling
- Underline indicator for active tab
- Hover effect on inactive tabs
- Flexbox layout with gap

## Features
- Tabs for switching between Movies and Categories
- Each tab loads its respective table component
- Tables have full CRUD functionality via modals
