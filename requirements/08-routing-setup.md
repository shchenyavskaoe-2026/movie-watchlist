# Routing Setup

## Overview
Angular routing configuration for navigation between Home and Settings pages.

## Location
`frontend/src/app/app.config.ts`

## Routes Configuration
```typescript
const routes: Routes = [
  { path: '', component: Home },
  { path: 'settings', component: Settings }
];
```

## Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Displays movie and category lists |
| `/settings` | Settings | Management page with tables and forms |

## Setup Steps
1. Import `provideRouter` and `Routes` from `@angular/router`
2. Import page components (Home, Settings)
3. Define routes array
4. Add `provideRouter(routes)` to providers

## App Template
```html
<app-header></app-header>
<router-outlet></router-outlet>
```

## Dependencies
- `@angular/router` - Angular's routing module
- `RouterOutlet` - Directive to display routed components
- `RouterLink` - Directive for navigation links
