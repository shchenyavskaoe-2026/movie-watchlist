# Header Component

## Overview
Navigation header with links to Home and Settings pages.

## Location
`frontend/src/app/components/header/`

## Files
- `header.ts` - Component logic
- `header.html` - Template with navigation
- `header.scss` - Styles

## Component Structure
```typescript
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
```

## Template
```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/settings">Settings</a>
</nav>
```

## Styling
- Bright teal background (#00bcd4)
- Navigation items on right side (flexbox justify-content: flex-end)
- White button-style links
- Dark teal bold text (#00838f)
- Hover effect with light teal background

## Dependencies
- `RouterLink` from `@angular/router`
