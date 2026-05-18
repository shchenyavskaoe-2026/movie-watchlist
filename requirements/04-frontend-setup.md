# Frontend Setup

## Overview
Angular 21 SPA with standalone components and zoneless change detection.

## Tech Stack
- Angular 21
- TypeScript (strict mode)
- Signals (reactive state)
- Zoneless change detection (no Zone.js)
- SCSS for styling
- Vitest for testing

## Key Configuration

### app.config.ts
```typescript
providers: [
  provideZonelessChangeDetection(),  // No Zone.js
  provideRouter(routes),
  provideHttpClient(withFetch())     // Fetch API
]
```

### Environment Config
- Dev: `http://localhost:5244/api`
- Prod: Configurable in environment.prod.ts

## Architecture
```
app/
├── app.config.ts      → Providers configuration
├── app.ts             → Root component
├── models/            → TypeScript interfaces
├── services/          → HTTP services
├── components/        → UI components
└── environments/      → Environment configs
```

## Patterns Used

### Signals (State Management)
```typescript
movies = signal<Movie[]>([]);
this.movies.set(data);        // Update
this.movies();                // Read in template
```

### Standalone Components
```typescript
@Component({
  standalone: true,  // Implicit in Angular 21
  imports: [ReactiveFormsModule],
  // ...
})
```

### Modern Control Flow
```html
@for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
} @empty {
  <li>No items</li>
}

@if (condition) {
  <span>Show this</span>
}
```

## Server
- Dev server: http://localhost:4200
- Auto-reload on file changes
