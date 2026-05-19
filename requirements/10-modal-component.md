# Modal Component

## Overview
Reusable modal dialog component for forms and confirmations.

## Location
`frontend/src/app/components/modal/`

## Files
- `modal.ts` - Component logic
- `modal.html` - Template
- `modal.scss` - Styles

## Component Structure

### Inputs/Outputs
```typescript
@Input() title = '';        // Modal header title
@Input() isOpen = false;    // Controls visibility
@Output() close = new EventEmitter<void>();  // Emits on close
```

### Methods
```typescript
onClose(): void {
  this.close.emit();
}
```

## Template
```html
@if (isOpen) {
  <div class="modal-backdrop" (click)="onClose()">
    <div class="modal-content" (click)="$event.stopPropagation()">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button class="close-btn" (click)="onClose()">x</button>
      </div>
      <div class="modal-body">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
}
```

## Key Features
- `@if (isOpen)` - Only renders when open
- Click on backdrop closes modal
- `$event.stopPropagation()` - Clicking inside doesn't close
- `<ng-content>` - Projects content from parent

## Styling
- Fixed position covering full screen
- Semi-transparent black backdrop (rgba(0,0,0,0.5))
- Centered white content box
- z-index: 1000 (above everything)
- Border-radius and shadow for modern look

## Usage Example
```html
<app-modal
  [title]="'Add Movie'"
  [isOpen]="isModalOpen()"
  (close)="closeModal()">
  <app-movie-form></app-movie-form>
</app-modal>
```
